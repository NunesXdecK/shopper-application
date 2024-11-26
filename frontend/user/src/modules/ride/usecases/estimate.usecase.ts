import { RideService } from "../domains/ride-service.type";
import { UseCase } from "../../../core/domains/use-case.type";

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
}

export const estimateUsecase = ({
  rideService,
}: UseCaseInput): UseCase<EstimateInput, EstimateOutput> => {
  return {
    execute: async (params: EstimateInput) => rideService.estimate(params),
  };
};
