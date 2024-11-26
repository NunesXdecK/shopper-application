import { RideService } from "../domains/ride-service.type";
import { UseCase } from "../../../core/domains/use-case.type";
import { ErrorService } from "../../../core/domains/error-service.type";

export interface Driver {
  id: number;
  name: string;
  vehicle: string;
  value: number;
  description: string;
  review: {
    rating: string;
    comment: string;
  };
}

export interface EstimateInput {
  customerId: string;
  origin: string;
  destiny: string;
}

export interface EstimateOutput {
  origin: string;
  duration: string;
  destination: string;
  routeResponse: string;
  distance: number;
  option: Driver[];
}

interface UseCaseInput {
  rideService: RideService;
  errorHandlerService: ErrorService;
}

export const estimateUsecase = ({
  rideService,
  errorHandlerService,
}: UseCaseInput): UseCase<EstimateInput, EstimateOutput | null> => {
  return {
    execute: async (params: EstimateInput) => {
      try {
        return rideService.estimate(params);
      } catch (error: unknown) {
        errorHandlerService.handler(error);
        return null;
      }
    },
  };
};
