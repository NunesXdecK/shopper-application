import {
  RideListInput,
  RideListOutput,
  rideListUsecase,
} from "../usecases/ride-list.usecase";
import { UseCase } from "../../../core/domains/use-case.type";
import { fetchHttpService } from "../../../infra/services/fetch-http.service";
import { rideService as RideService } from "../services/ride-service.service";
import { errorHandlerService as ErrorHandlerService } from "../../../core/services/error-handler.service";

export const rideListUseCaseFactory = (): UseCase<
  RideListInput,
  RideListOutput | null
> => {
  const errorHandlerService = ErrorHandlerService();
  const httpService = fetchHttpService({ errorHandlerService });
  const rideService = RideService({
    httpService,
    errorHandlerService,
  });
  return rideListUsecase({ rideService, errorHandlerService });
};
