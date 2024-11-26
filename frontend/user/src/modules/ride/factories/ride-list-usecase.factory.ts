import {
  RideListInput,
  RideListOutput,
  rideListUsecase,
} from "../usecases/ride-list.usecase";
import { UseCase } from "../../../core/domains/use-case.type";
import { fetchHttpService } from "../../../infra/services/fetch-http.service";
import { rideService as RideService } from "../services/ride-service.service";

export const rideListUseCaseFactory = (): UseCase<
  RideListInput,
  RideListOutput
> => {
  const httpService = fetchHttpService();
  const rideService = RideService({
    httpService,
  });
  return rideListUsecase({ rideService });
};
