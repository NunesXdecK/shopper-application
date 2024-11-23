import { UserRouter } from "../routers/user.router";
import { TypeORM } from "../../../infra/db/configs/type-orm.config";
import { CreateUserUseCase } from "../usecases/create-user.usecase";
import { UpdateUserUseCase } from "../usecases/update-user.usecase";
import { GetUserListUsecase } from "../usecases/get-user-list.usecase";
import { GetUserByIdUseCase } from "../usecases/get-user-by-id.usecase";
import { ExpressRouter } from "../../../infra/routers/express-http.router";
import { UserORMRepository } from "../services/user-orm-repository.service";
import { ConsoleLogService } from "../../../infra/services/console-log.service";
import { ORMRepository } from "../../../core/domains/ORMRepository.type";
import { User as UserModel } from "../domains/user.model";
import { User } from "../../../infra/db/entities/user.entity";

export class UserRouterFactory {
  static build(): UserRouter {
    const userRepository = TypeORM.getRepository(User);
    const logService = new ConsoleLogService();
    const repository = new UserORMRepository(
      userRepository as unknown as ORMRepository<UserModel>
    );
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
