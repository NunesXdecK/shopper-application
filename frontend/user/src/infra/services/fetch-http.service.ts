import {
  BackendError,
  BackendErrorProps,
} from "../../core/domains/backend-error.type";
import { ErrorService } from "../../core/domains/error-service.type";
import { HttpService } from "../../core/domains/http-service.type";
import { HttpRequestArgs } from "../../core/domains/types.type";
import { HttpMethods } from "../../core/enums/http-methods.enum";

interface Props {
  errorHandlerService: ErrorService;
}

export const fetchHttpService = <O = unknown>({
  errorHandlerService,
}: Props): HttpService => {
  const baseHeaders = {
    "Content-Type": "application/json",
  };

  const handleResponse = async (response: Response): Promise<O> => {
    const hasError = !response.ok;
    const result = (await response.json()) as unknown as Promise<O>;
    if (hasError) {
      errorHandlerService.handler(new BackendError(result as unknown as BackendErrorProps));
    }
    return result;
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
