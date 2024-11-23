import {
  RequestResponse,
  GoogleMapsRouteCalculatorService,
} from "../../../infra/services/route-calculator-service.service";
import { Driver } from "../domains/driver.model";
import { RideRouter } from "../routers/ride.router";
import { User } from "../../user/domains/user.model";
import { TypeORM } from "../../../infra/db/configs/type-orm.config";
import { HttpService } from "../../../core/domains/http-service.type";
import { EstimateRideUseCase } from "../usecases/estimate-ride.usecase";
import { ORMRepository } from "../../../core/domains/orm-repository.type";
import { ExpressRouter } from "../../../infra/routers/express-http.router";
import { User as UserEntity } from "../../../infra/db/entities/user.entity";
import { FetchHttpService } from "../../../infra/services/fetch-http.service";
import { ConsoleLogService } from "../../../infra/services/console-log.service";
import { DriverORMRepository } from "../services/driver-orm-repository.service";
import { Driver as DriverEntity } from "../../../infra/db/entities/driver.entity";
import { UserORMRepository } from "../../user/services/user-orm-repository.service";
import { DistanceHelper } from "../../../core/utils/distance.helper";

export class RideRouterFactory {
  static build(): RideRouter {
    const router = new ExpressRouter();
    const httpService = new FetchHttpService();
    const logService = new ConsoleLogService();
    const driverORMRepository = TypeORM.getRepository(DriverEntity);
    const userORMRepository = TypeORM.getRepository(UserEntity);
    const userRepository = new UserORMRepository(
      userORMRepository as unknown as ORMRepository<User>
    );
    const driverRepository = new DriverORMRepository(
      driverORMRepository as unknown as ORMRepository<Driver>
    );
    const routeCalculatorService = new GoogleMapsRouteCalculatorService({
      httpService: httpService as HttpService<RequestResponse>,
    });
    const useCases = {
      estimateRideUseCase: new EstimateRideUseCase({
        userRepository,
        driverRepository,
        routeCalculatorService,
        distanceHelper: new DistanceHelper(),
      }),
    };
    return new RideRouter({ router, useCases, logService });
  }
}
