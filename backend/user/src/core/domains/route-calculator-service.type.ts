export type Response<O = unknown> = {
  course: {
    time: string;
    distance: number;
  };
  originalResponse: O;
};

export type RoutePoint = {
  latitude: number;
  longitude: number;
};

export type Params = {
  origin: RoutePoint;
  destination: RoutePoint;
};

export interface RouteCalculator<O = unknown> {
  getRouteInformation: (params: Params) => Promise<Response<O>>;
}
