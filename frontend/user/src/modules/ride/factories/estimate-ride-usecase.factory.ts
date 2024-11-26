import {
  EstimateInput,
  EstimateOutput,
  estimateUsecase,
} from "../usecases/estimate.usecase";
import { UseCase } from "../../../core/domains/use-case.type";
import { fetchHttpService } from "../../../infra/services/fetch-http.service";
import { rideService as RideService } from "../services/ride-service.service";
import { errorHandlerService as ErrorHandlerService } from "../../../core/services/error-handler.service";

export const estimateRideUseCaseFactory = (): UseCase<
  EstimateInput,
  EstimateOutput | null
> => {
  const errorHandlerService = ErrorHandlerService();
  const httpService = fetchHttpService({ errorHandlerService });
  const rideService = RideService({
    httpService,
    errorHandlerService,
  });
  return estimateUsecase({ rideService, errorHandlerService });
};
