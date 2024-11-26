import { RideService } from "../domains/ride-service.type";
import { UseCase } from "../../../core/domains/use-case.type";
import { ErrorService } from "../../../core/domains/error-service.type";

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
  errorHandlerService: ErrorService;
}

export const confirmUsecase = ({
  rideService,
  errorHandlerService,
}: UseCaseInput): UseCase<ConfirmInput, ConfirmOutput | null> => {
  return {
    execute: async (params: ConfirmInput) => {
      try {
        return rideService.confirm(params);
      } catch (error: unknown) {
        errorHandlerService.handler(error);
        return null;
      }
    },
  };
};
