import { RideService } from "../domains/ride-service.type";
import { UseCase } from "../../../core/domains/use-case.type";

export interface ConfirmInput {
  origin: string;
  duration: string;
  destination: string;
  customer_id: string;
  value: number;
  distance: number;
  driver: {
    id: number;
    name: string;
  };
}

export interface ConfirmOutput {
  success: boolean;
}

interface UseCaseInput {
  rideService: RideService;
}

export const confirmUsecase = ({
  rideService,
}: UseCaseInput): UseCase<ConfirmInput, ConfirmOutput> => {
  return {
    execute: async (params: ConfirmInput) => rideService.confirm(params),
  };
};
