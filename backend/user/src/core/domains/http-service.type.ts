import { HttpRequestArgs } from "./types.type";

export interface HttpService<O = unknown> {
  get: (url: string, args?: HttpRequestArgs) => Promise<O>;
  put: (url: string, args: HttpRequestArgs) => Promise<O>;
  post: (url: string, args: HttpRequestArgs) => Promise<O>;
  delete: (url: string, args: HttpRequestArgs) => Promise<O>;
}
