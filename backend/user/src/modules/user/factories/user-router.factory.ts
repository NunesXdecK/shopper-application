import { ExpressRouter } from "../../../infra/routers/express-http.router";
import { ConsoleLogService } from "../../../infra/services/console-log.service";
import { FetchHttpService } from "../../../infra/services/fetch-http.service";
import { UserRouter } from "../routers/user.router";
import { UserMemoryRepository } from "../services/user-memory-repository.service";
import { CreateUserUseCase } from "../usecases/create-user.usecase";
import { GetUserByIdUseCase } from "../usecases/get-user-by-id.usecase";
import { GetUserListUsecase } from "../usecases/get-user-list.usecase";
import { UpdateUserUseCase } from "../usecases/update-user.usecase";

export class UserRouterFactory {
  static build(): UserRouter {
    const httpService = new FetchHttpService();
    const logService = new ConsoleLogService();
    const repository = new UserMemoryRepository();
    const router = new ExpressRouter();
    const useCases = {
      getUseCase: new GetUserListUsecase({ userRepository: repository }),
      createUseCase: new CreateUserUseCase({ userRepository: repository }),
      updateUseCase: new UpdateUserUseCase({ userRepository: repository }),
      getByIdUseCase: new GetUserByIdUseCase({ userRepository: repository }),
    };
    return new UserRouter({ router, useCases, logService });
  }
}
