import { HttpService } from "../../core/domains/http-service.type";
import { HttpRequestArgs } from "../../core/domains/types.type";
import { HttpMethods } from "../../core/enums/http-methods.enum";

export const fetchHttpService = <O = unknown>(): HttpService => {
  const baseHeaders = {
    "Content-Type": "application/json",
  };

  const handleResponse = async (response: Response): Promise<O> => {
    if (!response.ok) {
      throw new Error(`[Error][FetchHttpService]: ${response.status}`);
    }
    return response.json() as unknown as Promise<O>;
  };

  return {
    get: async <O>(url: string, args: HttpRequestArgs = {}): Promise<O> => {
      const response = await fetch(url, {
        ...args,
        method: HttpMethods.GET,
        headers: {
          ...baseHeaders,
          ...args?.headers,
        },
      });
      return handleResponse(response) as unknown as Promise<O>;
    },

    post: async <O>(url: string, args: HttpRequestArgs): Promise<O> => {
      const response = await fetch(url, {
        ...args,
        method: HttpMethods.POST,
        headers: {
          ...baseHeaders,
          ...args?.headers,
        },
      });
      return handleResponse(response) as unknown as Promise<O>;
    },

    put: async <O>(url: string, args: HttpRequestArgs): Promise<O> => {
      const response = await fetch(url, {
        ...args,
        method: HttpMethods.PUT,
        headers: {
          ...baseHeaders,
          ...args?.headers,
        },
      });
      return handleResponse(response) as unknown as Promise<O>;
    },

    delete: async <O>(url: string, args: HttpRequestArgs): Promise<O> => {
      const response = await fetch(url, {
        ...args,
        method: HttpMethods.DELETE,
        headers: {
          ...baseHeaders,
          ...args?.headers,
        },
      });
      return handleResponse(response) as unknown as Promise<O>;
    },
  };
};
