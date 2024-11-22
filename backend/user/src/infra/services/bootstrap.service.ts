import { HttpServer } from "../../core/domains/http-server.type";
import { LogService } from "../../core/domains/log-service.type";
import { Module } from "../../core/domains/module.type";
import { RequestHandler } from "../../core/domains/types.type";

type Props = {
  httpServer: HttpServer;
  logService: LogService;
  middlewares: RequestHandler<void>[];
  modules: Module[];
};

export class Bootstrap {
  #httpServer: HttpServer;
  #logService: LogService;
  #middlewares: RequestHandler<void>[];
  #modules: Module[];

  constructor({ httpServer, logService, middlewares, modules }: Props) {
    this.#modules = modules;
    this.#httpServer = httpServer;
    this.#logService = logService;
    this.#middlewares = middlewares;
    this.#initializeMiddlewares();
    this.#registerModules();
    this.#logService.log(`[${this.constructor.name}] Server initialized.`);
  }

  #initializeMiddlewares() {
    this.#middlewares.forEach((middleware: RequestHandler) => {
      try {
        this.#httpServer.useMiddleware(middleware);
        this.#logService.log(
          `[Middleware][${
            middleware.name
          }] Initialized.`
        );
      } catch (error: any) {
        this.#logService.log(
          `[Middleware][${
            middleware.name
          }] Failed to initialize.`
        );
        this.#logService.log(error.message);
      }
    });
  }

  #registerModules() {
    this.#modules.forEach((module) => {
      try {
        const router = module.router;
        this.#httpServer.useRouter(router.route, router.router);
        this.#logService.log(
          `[Module][${module.name ?? module.constructor.name}] Initialized.`
        );
      } catch (error: any) {
        this.#logService.log(
          `[Module][${
            module.name ?? module.constructor.name
          }] Failed to initialize.`
        );
        this.#logService.log(error.message);
      }
    });
  }

  get app() {
    return this.#httpServer.app;
  }
}
