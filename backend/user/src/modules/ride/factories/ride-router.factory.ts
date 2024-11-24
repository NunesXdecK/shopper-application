import {
  RequestResponse,
  GoogleMapsRouteCalculatorService,
} from "../../../infra/services/route-calculator-service.service";
import { Ride } from "../domains/ride.model";
import { Driver } from "../domains/driver.model";
import { User } from "../../user/domains/user.model";
import { RideRouter } from "../routers/ride-router.router";
import { RideListUseCase } from "../usecases/ride-list.usecase";
import { TypeORM } from "../../../infra/db/configs/type-orm.config";
import { DistanceHelper } from "../../../core/utils/distance.helper";
import { HttpService } from "../../../core/domains/http-service.type";
import { ConfirmRideUseCase } from "../usecases/confirm-ride.usecase";
import { EstimateRideUseCase } from "../usecases/estimate-ride.usecase";
import { ORMRepository } from "../../../core/domains/orm-repository.type";
import { ExpressRouter } from "../../../infra/routers/express-http.router";
import { RideORMRepository } from "../services/ride-orm-repository.service";
import { Ride as RideEntity } from "../../../infra/db/entities/ride.entity";
import { User as UserEntity } from "../../../infra/db/entities/user.entity";
import { FetchHttpService } from "../../../infra/services/fetch-http.service";
import { ConsoleLogService } from "../../../infra/services/console-log.service";
import { DriverORMRepository } from "../services/driver-orm-repository.service";
import { Driver as DriverEntity } from "../../../infra/db/entities/driver.entity";
import { UserORMRepository } from "../../user/services/user-orm-repository.service";

export class RideRouterFactory {
  static build(): RideRouter {
    const router = new ExpressRouter();
    const httpService = new FetchHttpService();
    const logService = new ConsoleLogService();
    const distanceHelper = new DistanceHelper();
    const rideORMRepository = TypeORM.getRepository(RideEntity);
    const userORMRepository = TypeORM.getRepository(UserEntity);
    const driverORMRepository = TypeORM.getRepository(DriverEntity);
    const userRepository = new UserORMRepository(
      userORMRepository as unknown as ORMRepository<User>
    );
    const rideRepository = new RideORMRepository(
      rideORMRepository as unknown as ORMRepository<Ride>
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
        distanceHelper,
        driverRepository,
        routeCalculatorService,
      }),
      confirmRideUseCase: new ConfirmRideUseCase({
        distanceHelper,
        rideRepository,
        driverRepository,
      }),
      rideListUseCase: new RideListUseCase({
        rideRepository,
        driverRepository,
      }),
    };
    return new RideRouter({ router, useCases, logService });
  }
}
