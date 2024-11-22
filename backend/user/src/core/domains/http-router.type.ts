import { MethodHandler } from "./types.type";

export type HttpRouter<O = unknown> = {
  getRouter: any;
  get: MethodHandler<O>;
  put: MethodHandler<O>;
  post: MethodHandler<O>;
  delete: MethodHandler<O>;
};
