import { ExternalService } from "../../core/domains/external-service.type";
import { HttpServer } from "../../core/domains/http-server.type";
import { LogService } from "../../core/domains/log-service.type";
import { Module } from "../../core/domains/module.type";
import { RequestHandler } from "../../core/domains/types.type";

type Props = {
  httpServer: HttpServer;
  logService: LogService;
  externalServices: ExternalService[];
  middlewares: RequestHandler<void>[];
  modules: Module[];
};

export class Bootstrap {
  #modules: Module[];
  #httpServer: HttpServer;
  #logService: LogService;
  #middlewares: RequestHandler<void>[];
  #externalServices: ExternalService[];

  constructor({
    modules,
    httpServer,
    logService,
    middlewares,
    externalServices,
  }: Props) {
    this.#modules = modules;
    this.#httpServer = httpServer;
    this.#logService = logService;
    this.#middlewares = middlewares;
    this.#externalServices = externalServices;
    this.#initializeExternalServices();
    this.#initializeMiddlewares();
    this.#registerModules();
    this.#logService.log(`[${this.constructor.name}] Server initialized.`);
  }

  async #initializeExternalServices() {
    this.#externalServices.forEach(async (service: ExternalService) => {
      try {
        await service.init();
        this.#logService.log(`[ExternalService][${service.name}] Initialized.`);
      } catch (error: any) {
        this.#logService.log(
          `[ExternalService][${service.name}] Failed to initialize.`
        );
        this.#logService.log(error.message);
      }
    });
  }

  #initializeMiddlewares() {
    this.#middlewares.forEach((middleware: RequestHandler) => {
      try {
        this.#httpServer.useMiddleware(middleware);
        this.#logService.log(`[Middleware][${middleware.name}] Initialized.`);
      } catch (error: any) {
        this.#logService.log(
          `[Middleware][${middleware.name}] Failed to initialize.`
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
