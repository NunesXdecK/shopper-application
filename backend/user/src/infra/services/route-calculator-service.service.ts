import {
  Params,
  RoutePoint,
  RouteCalculator,
  Response,
} from "../../core/domains/route-calculator-service.type";
import { HttpHeaders } from "../../core/domains/types.type";
import { HttpService } from "../../core/domains/http-service.type";

type GoogleRoutePoint = {
  address?: string;
  location?: {
    latLng: {
      latitude: number;
      longitude: number;
    };
  };
};

type RequestParams = {
  units: string;
  travelMode: string;
  languageCode: string;
  routingPreference: string;
  computeAlternativeRoutes: boolean;
  origin: GoogleRoutePoint;
  destination: GoogleRoutePoint;
  routeModifiers: {
    avoidTolls: boolean;
    avoidFerries: boolean;
    avoidHighways: boolean;
  };
};

export type RequestResponse = {
  body: any;
  status: number;
  routes: {
    duration: string;
    distanceMeters: number;
    polyline: {
      encodedPolyline: string;
    };
  }[];
};

type Props = {
  httpService: HttpService<RequestResponse>;
};

export class GoogleMapsRouteCalculatorService implements RouteCalculator {
  #httpService;

  constructor({ httpService }: Props) {
    this.#httpService = httpService;
  }

  #mountRoutePoint({ latitude, longitude }: RoutePoint): GoogleRoutePoint {
    return {
      location: {
        latLng: {
          latitude,
          longitude,
        },
      },
    };
  }

  #mountAddress(address: string): GoogleRoutePoint {
    return {
      address: address,
    };
  }

  async getRouteInformation({
    origin,
    isLocation,
    destination,
  }: Params): Promise<Response<RequestResponse>> {
    const body: RequestParams = {
      units: "IMPERIAL",
      travelMode: "DRIVE",
      languageCode: "pt-BR",
      computeAlternativeRoutes: false,
      routingPreference: "TRAFFIC_AWARE",
      origin: isLocation
        ? this.#mountRoutePoint(origin as RoutePoint)
        : this.#mountAddress(origin as string),
      destination: isLocation
        ? this.#mountRoutePoint(destination as RoutePoint)
        : this.#mountAddress(destination as string),
      routeModifiers: {
        avoidTolls: false,
        avoidHighways: false,
        avoidFerries: false,
      },
    };

    const headers = {
      "Content-Type": "application/json",
      "X-Goog-FieldMask":
        "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline",
      ["X-Goog-Api-Key" as string]: process.env.GOOGLE_API_KEY,
    } as unknown as HttpHeaders;

    const googleMapsResponse = await this.#httpService.post(
      "https://routes.googleapis.com/directions/v2:computeRoutes",
      {
        body: JSON.stringify(body) as any,
        headers,
      }
    );
    const responseBody = await (googleMapsResponse as any).json();
    const route = responseBody?.routes?.[0];
    if (!route || !route?.distanceMeters || route?.distanceMeters === 0)
      throw new Error("Route not found.");
    return {
      course: {
        time: route.duration,
        distance: route?.distanceMeters,
      },
      originalResponse: route,
    };
  }
}
