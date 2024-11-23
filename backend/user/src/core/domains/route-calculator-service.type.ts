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
  isLocation?: boolean;
  origin: RoutePoint | string;
  destination: RoutePoint | string;
};

export interface RouteCalculator<O = unknown> {
  getRouteInformation: (params: Params) => Promise<Response<O>>;
}
