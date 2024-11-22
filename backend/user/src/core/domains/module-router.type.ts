import { HttpRouter } from "./http-router.type";
import { UseCase } from "./use-case.type";

export interface ModuleRouter<O = unknown> {
  route: string;
  router: HttpRouter<O>;
  useCases: {
    [useCase: string]: UseCase<any, any>;
  };
}
