import {
  EstimateInput,
  EstimateOutput,
  estimateUsecase,
} from "../usecases/estimate.usecase";
import { UseCase } from "../../../core/domains/use-case.type";
import { fetchHttpService } from "../../../infra/services/fetch-http.service";
import { rideService as RideService } from "../services/ride-service.service";

export const estimateRideUseCaseFactory = (): UseCase<
  EstimateInput,
  EstimateOutput
> => {
  const httpService = fetchHttpService();
  const rideService = RideService({
    httpService,
  });
  return estimateUsecase({ rideService });
};
