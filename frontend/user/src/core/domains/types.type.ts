import { HttpMethods } from "../enums/http-methods.enum";

export type HttpMethod =
  | HttpMethods.GET
  | HttpMethods.PUT
  | HttpMethods.POST
  | HttpMethods.DELETE
  | string;

export type HttpHeaders = { [label: string]: string };

export type HttpRequestArgs = RequestInit & {
  method?: HttpMethod;
  headers?: HttpHeaders;
  body?: HttpHeaders | string;
};
