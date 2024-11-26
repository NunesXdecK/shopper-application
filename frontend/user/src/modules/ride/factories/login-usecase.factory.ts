import { UseCase } from "../../../core/domains/use-case.type";
import { fetchHttpService } from "../../../infra/services/fetch-http.service";
import { localStorageService as localDataService } from "../../../infra/services/local-storage.service";
import { userAuthService } from "../services/user-auth-service.service";
import { AuthInput, AuthOutput, loginUsecase } from "../usecases/login.usecase";

export const userAuthServiceFactory = (): UseCase<AuthInput, AuthOutput> => {
  const httpService = fetchHttpService();
  const localStorageService = localDataService("user");
  const authService = userAuthService({
    httpService,
    localStorageService,
  });
  return loginUsecase({ authService })
};
