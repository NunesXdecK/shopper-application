import { UseCase } from "../../../core/domains/use-case.type";
import { errorHandlerService as ErrorHandlerService} from "../../../core/services/error-handler.service";
import { fetchHttpService } from "../../../infra/services/fetch-http.service";
import { localStorageService as localDataService } from "../../../infra/services/local-storage.service";
import { userAuthService } from "../services/user-auth-service.service";
import { AuthInput, AuthOutput, loginUsecase } from "../usecases/login.usecase";

export const userAuthServiceFactory = (): UseCase<AuthInput, AuthOutput> => {
  const errorHandlerService = ErrorHandlerService()
  const httpService = fetchHttpService({ errorHandlerService });
  const localStorageService = localDataService("user");
  const authService = userAuthService({
    httpService,
    localStorageService,
  });
  return loginUsecase({ authService })
};
