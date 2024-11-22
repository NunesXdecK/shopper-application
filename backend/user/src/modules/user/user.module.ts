import { Module } from "../../core/domains/module.type";
import { ModuleRouter } from "../../core/domains/module-router.type";

export class UserModule implements Module {
  name = "UserModule";
  #router: ModuleRouter;
  
  constructor(router: ModuleRouter) {
    this.#router = router;
  }

  get router() {
    return this.#router;
  }
}
