import { RequestHandler } from "./types.type";

export interface Middleware<I = unknown, O = unknown> {
  process: (params: I) => RequestHandler<O>;
}
