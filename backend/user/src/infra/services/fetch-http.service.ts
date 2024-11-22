import { HttpService } from "../../core/domains/http-service.type";
import { HttpRequestArgs } from "../../core/domains/types.type";
import { HttpMethods } from "../../core/enums/http-methods.enum";

export class FetchHttpService implements HttpService {
  #baseHeaders = {
    "Content-Type": "application/json",
  };

  async get(url: string, args: HttpRequestArgs = {}): Promise<unknown> {
    return fetch(url, {
      ...args,
      method: HttpMethods.GET,
      headers: {
        ...this.#baseHeaders,
        ...args?.headers,
      },
    } as any);
  }

  async post(url: string, args: HttpRequestArgs): Promise<unknown> {
    return fetch(url, {
      ...args,
      method: HttpMethods.POST,
      headers: {
        ...this.#baseHeaders,
        ...args?.headers,
      },
    } as any);
  }

  async put(url: string, args: HttpRequestArgs): Promise<unknown> {
    return fetch(url, {
      ...args,
      method: HttpMethods.PUT,
      headers: {
        ...this.#baseHeaders,
        ...args?.headers,
      },
    } as any);
  }

  async delete(url: string, args: HttpRequestArgs): Promise<unknown> {
    return fetch(url, {
      ...args,
      method: HttpMethods.DELETE,
      headers: {
        ...this.#baseHeaders,
        ...args?.headers,
      },
    } as any);
  }
}
