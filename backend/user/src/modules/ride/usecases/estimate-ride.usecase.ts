import { Ride, RideInput } from "../domains/ride.model";
import { UseCase } from "../../../core/domains/use-case.type";
import { UserRepository } from "../../user/domains/user-repository.type";
import { RequestResponse } from "../../../infra/services/route-calculator-service.service";
import {
  Params,
  Response,
  RouteCalculator,
} from "../../../core/domains/route-calculator-service.type";
import { DriverRepository } from "../domains/driver-repository.type";
import { Driver } from "../domains/driver.model";
import { DistanceHelper } from "../../../core/utils/distance.helper";

export type EstimateRideResponse = Response<RequestResponse> &
  Params & {
    drivers: Driver[];
  };

type Props = {
  userRepository: UserRepository;
  distanceHelper: DistanceHelper;
  driverRepository: DriverRepository;
  routeCalculatorService: RouteCalculator;
};
export class EstimateRideUseCase implements UseCase<Partial<RideInput>, any> {
  #userRepository: UserRepository;
  #distanceHelper: DistanceHelper;
  #driverRepository: DriverRepository;
  #routeCalculatorService: RouteCalculator;

  constructor({
    distanceHelper,
    userRepository,
    driverRepository,
    routeCalculatorService,
  }: Props) {
    this.#userRepository = userRepository;
    this.#distanceHelper = distanceHelper;
    this.#driverRepository = driverRepository;
    this.#routeCalculatorService = routeCalculatorService;
  }

  async execute(params: Partial<RideInput>): Promise<EstimateRideResponse> {
    try {
      const ride = new Ride(params);
      // await this.#userRepository.findById(ride.user as string);
      const calc = await this.#routeCalculatorService.getRouteInformation(
        ride.getRoute
      );
      const distance = this.#distanceHelper.metterToKilometer(
        calc.course.distance
      );
      const drivers = await this.#driverRepository.getAvaliableForRide({
        minimumKM: distance,
      });
      return {
        ...calc,
        ...ride.getRoute,
        drivers: drivers?.map((driver) => {
          const driverModel = new Driver(driver);
          driverModel.value(distance);
          return driverModel;
        }),
      } as unknown as EstimateRideResponse;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
