import { AuthService } from "../../../core/domains/auth-service";
import { HttpService } from "../../../core/domains/http-service.type";
import { LocalStorageService } from "../../../core/domains/local-storage-service";
import { HttpRequestArgs } from "../../../core/domains/types.type";
import { AuthInput, AuthOutput } from "../usecases/login.usecase";

interface InputProps {
  httpService: HttpService;
  localStorageService: LocalStorageService;
}

export const userAuthService = ({
  httpService,
  localStorageService,
}: InputProps): AuthService<AuthInput, AuthOutput> => {
  const baseUrl = `${import.meta.env.VITE_BACKEND_URL}users`;
  return {
    login: async (params: AuthInput): Promise<AuthOutput> => {
      const response = await httpService.post<AuthOutput>(baseUrl, {
        body: params,
      } as unknown as HttpRequestArgs);
      localStorageService.set(response.id);
      return response as AuthOutput;
    },
    logout: () => localStorageService.remove(),
  };
};
