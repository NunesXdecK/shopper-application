import { HttpRouter } from "../../../core/domains/http-router.type";
import { LogService } from "../../../core/domains/log-service.type";
import { Request, Response } from "../../../core/domains/types.type";
import { ModuleRouter } from "../../../core/domains/module-router.type";
import {
  EstimateRideResponse,
  EstimateRideUseCase,
} from "../usecases/estimate-ride.usecase";
import { ConfirmRide } from "../domains/cofirm-ride.model";
import { ConfirmRideUseCase } from "../usecases/confirm-ride.usecase";

export type RideUseCases = {
  confirmRideUseCase: ConfirmRideUseCase;
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
          const { location, customer_id, origin, destiny } = request.body;
          if (!customer_id) throw new Error("Customer id not received");
          if (!origin) throw new Error("Origin location id not received");
          if (!destiny) throw new Error("Destiny location id not received");

          const isLocation = location === "true";
          const originLocation = isLocation ? origin.split(":") : origin;
          const destinyLocation = isLocation ? destiny.split(":") : destiny;
          const params = {
            isLocation,
            user: request.body.customer_id,
            ...(isLocation
              ? {
                  originAddressLat: originLocation?.[0],
                  originAddressLog: originLocation?.[1],
                  destinyAddressLat: destinyLocation?.[0],
                  destinyAddressLog: destinyLocation?.[1],
                }
              : {
                  originAddress: originLocation,
                  destinyAddress: destinyLocation,
                }),
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

    this.#router.post(
      "/confirm",
      async (request: Request, response: Response) => {
        let input;
        try {
          input = new ConfirmRide(request.body);
        } catch (error: any) {
          this.rejects({
            response,
            code: 400,
            message: error.message,
            errorCode: "INVALID_DATA",
          });
          return;
        }

        try {
          await this.#useCases.confirmRideUseCase.execute(input.inputRide);
        } catch (error: any) {
          const information = error.message.includes("Driver not found")
            ? {
                code: 404,
                errorCode: "DRIVER_NOT_FOUND",
              }
            : { code: 406, errorCode: "INVALID_DISTANCE" };
          this.rejects({
            response,
            message: error.message,
            code: information.code,
            errorCode: information.errorCode,
          });
          return;
        }

        response.status(200).json({ success: true });
      }
    );
  }

  rejects({
    code,
    message,
    response,
    errorCode,
  }: {
    code: number;
    message: string;
    errorCode: string;
    response: Response;
  }) {
    this.#logService.log(`[${this.constructor.name}] ${message}`);
    response.status(code).json({
      error_code: errorCode,
      error_description: message,
    });
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
