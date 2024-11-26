import { HttpRequestArgs } from "./types.type";

export interface HttpService {
  get: <O = unknown>(url: string, args?: HttpRequestArgs) => Promise<O>;
  put: <O = unknown>(url: string, args: HttpRequestArgs) => Promise<O>;
  post: <O = unknown>(url: string, args: HttpRequestArgs) => Promise<O>;
  delete: <O = unknown>(url: string, args: HttpRequestArgs) => Promise<O>;
}
