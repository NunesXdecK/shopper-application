import { HttpRouter } from "../../../core/domains/http-router.type";
import { LogService } from "../../../core/domains/log-service.type";
import { Request, Response } from "../../../core/domains/types.type";
import { ModuleRouter } from "../../../core/domains/module-router.type";
import { CreateUserUseCase } from "../usecases/create-user.usecase";
import { UpdateUserUseCase } from "../usecases/update-user.usecase";
import { GetUserListUsecase } from "../usecases/get-user-list.usecase";
import { GetUserByIdUseCase } from "../usecases/get-user-by-id.usecase";

export type UserUseCases = {
  getUseCase: GetUserListUsecase;
  createUseCase: CreateUserUseCase;
  updateUseCase: UpdateUserUseCase;
  getByIdUseCase: GetUserByIdUseCase;
};

type Props = {
  router: HttpRouter<any>;
  useCases: UserUseCases;
  logService: LogService;
};

export class UserRouter implements ModuleRouter {
  #router: HttpRouter<any>;
  #useCases: UserUseCases;
  #logService: LogService;
  #baseRoute: string = "/users";

  constructor({ router, useCases, logService }: Props) {
    this.#router = router;
    this.#useCases = useCases;
    this.#logService = logService;
    this.#defineRoutes();
  }

  #defineRoutes() {
    this.#router.get("/", async (_: Request, response: Response) => {
      try {
        const users = await this.#useCases.getUseCase.execute();
        response.status(200).json(users);
      } catch (error: any) {
        this.#logService.log(`[${this.constructor.name}] ${error.message}`);
        response.status(500).json({ message: error.message });
      }
    });

    this.#router.get("/:id", async (request: Request, response: Response) => {
      try {
        const id = request.params.id;
        const user = await this.#useCases.getByIdUseCase.execute(id);
        response.status(200).json(user);
      } catch (error: any) {
        this.#logService.log(`[${this.constructor.name}] ${error.message}`);
        response.status(500).json({ message: error.message });
      }
    });

    this.#router.post("/", async (request: Request, response: Response) => {
      try {
        const userCreated = await this.#useCases.createUseCase.execute(
          request.body
        );
        response.status(200).json({ message: "success!", id: userCreated.id });
      } catch (error: any) {
        this.#logService.log(`[${this.constructor.name}] ${error.message}`);
        response.status(500).json({ message: error.message });
      }
    });

    this.#router.put("/:id", async (request: Request, response: Response) => {
      try {
        const id = request.params.id;
        await this.#useCases.updateUseCase.execute({
          ...request.body,
          id,
        });
        response.status(200).json({ message: "success!" });
      } catch (error: any) {
        this.#logService.log(`[${this.constructor.name}] ${error.message}`);
        response.status(500).json({ message: error.message });
      }
    });
  }

  get useCases() {
    return this.#useCases;
  }

  get route() {
    return this.#baseRoute;
  }

  get router() {
    return this.#router.getRouter;
  }
}
