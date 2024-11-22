import { ModuleRouter } from "./module-router.type";

export interface Module {
  name: string;
  router: ModuleRouter;
}
