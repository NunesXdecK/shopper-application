import { UserModule } from "../user.module";
import { UserRouterFactory } from "./user-router.factory";

export class UserModuleFactory {
  static build(): UserModule {
    const router = UserRouterFactory.build()
    return new UserModule(router);
  }
}
