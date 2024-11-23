import { RideModule } from "../ride.module";
import { RideRouterFactory } from "./ride-router.factory";

export class RideModuleFactory {
  static build(): RideModule {
    const router = RideRouterFactory.build();
    return new RideModule(router);
  }
}
