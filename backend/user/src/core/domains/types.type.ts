import { HttpMethods } from "../enums/http-methods.enum";

export type HttpMethod =
  | HttpMethods.GET
  | HttpMethods.PUT
  | HttpMethods.POST
  | HttpMethods.DELETE
  | string;

export type HttpRequestArgs = {
  method?: HttpMethod;
  headers?: { [label: string]: string };
  body?: { [label: string]: string } | string;
};

export type Response = {
  savedBody?: Object;
  statusCode: number;
  statusMessage: string;
  json: (params: Object) => Response;
  status: (code: number) => Response;
  send: (body: Object) => void;
  on: (action: string, handler: () => void) => void;
};

export type Request = {
  url: string;
  method: string;
  baseUrl: string;
  body: Object;
  params: {
    [label: string]: any;
  };
};

export type RequestHandler<O = unknown> = (
  request: Request,
  response: Response,
  next: () => void
) => Promise<O>;

export type MethodHandler<O = unknown> = (path: string, handler: O) => void;
