import {
  ConfirmInput,
  ConfirmOutput,
  confirmUsecase,
} from "../usecases/confirm.usecase";
import { UseCase } from "../../../core/domains/use-case.type";
import { fetchHttpService } from "../../../infra/services/fetch-http.service";
import { rideService as RideService } from "../services/ride-service.service";

export const confirmRideUseCaseFactory = (): UseCase<
  ConfirmInput,
  ConfirmOutput
> => {
  const httpService = fetchHttpService();
  const rideService = RideService({
    httpService,
  });
  return confirmUsecase({ rideService });
};
