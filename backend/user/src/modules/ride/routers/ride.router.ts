import { HttpRouter } from "../../../core/domains/http-router.type";
import { LogService } from "../../../core/domains/log-service.type";
import { Request, Response } from "../../../core/domains/types.type";
import { ModuleRouter } from "../../../core/domains/module-router.type";
import {
  EstimateRideResponse,
  EstimateRideUseCase,
} from "../usecases/estimate-ride.usecase";

export type RideUseCases = {
  estimateRideUseCase: EstimateRideUseCase;
};

type Props = {
  router: HttpRouter<any>;
  useCases: RideUseCases;
  logService: LogService;
};

export class RideRouter implements ModuleRouter {
  #router: HttpRouter<any>;
  #useCases: RideUseCases;
  #logService: LogService;
  #baseRoute: string = "/ride";

  constructor({ router, useCases, logService }: Props) {
    this.#router = router;
    this.#useCases = useCases;
    this.#logService = logService;
    this.#defineRoutes();
  }

  #defineRoutes() {
    this.#router.post(
      "/estimate",
      async (request: Request, response: Response) => {
        try {
          const { customer_id, origin, destiny } = request.body;
          if (!customer_id) throw new Error("Customer id not received");
          if (!origin) throw new Error("Origin location id not received");
          if (!destiny) throw new Error("Destiny location id not received");
          
          const originLocation = request.body.origin.split(":");
          const destinyLocation = request.body.destiny.split(":");
          const params = {
            user: request.body.customer_id,
            originAddressLat: originLocation?.[0],
            originAddressLog: originLocation?.[1],
            destinyAddressLat: destinyLocation?.[0],
            destinyAddressLog: destinyLocation?.[1],
          };
          const estimate = (await this.#useCases.estimateRideUseCase.execute(
            params
          )) as EstimateRideResponse;
          const result = {
            origin: estimate.origin,
            duration: estimate.course.time,
            destination: estimate.destination,
            distance: estimate.course.distance,
            routeResponse: estimate.originalResponse,
            option: estimate?.drivers?.map((driver) => ({
              id: driver.id,
              name: driver.name,
              vehicle: driver.car,
              value: driver.rideValue,
              description: driver.description,
              review: {
                rating: driver.valuation,
                comment: driver.lastValuationMessage,
              },
            })),
          };
          response.status(200).json(result);
        } catch (error: any) {
          this.#logService.log(`[${this.constructor.name}] ${error.message}`);
          response.status(400).json({
            error_code: "INVALID_DATA",
            error_description: error.message,
          });
        }
      }
    );
  }

  get useCases() {
    return this.#useCases;
  }

  get route() {
    return this.#baseRoute;
  }

  get router() {
    return this.#router.getRouter;
  }
}
