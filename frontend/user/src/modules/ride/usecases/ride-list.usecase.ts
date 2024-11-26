import { RideService } from "../domains/ride-service.type";
import { UseCase } from "../../../core/domains/use-case.type";
import { ErrorService } from "../../../core/domains/error-service.type";

export interface RideDriver {
  id: number;
  name: string;
}

export interface RideListItem {
  id: string;
  origin: string;
  duration: string;
  destination: string;
  value: number;
  distance: number;
  date: Date;
  driver: RideDriver;
}

export interface RideListInput {
  driverId?: number;
  customerId: string;
}

export interface RideListOutput {
  customer_id: string;
  rides: RideListItem[];
}

interface UseCaseInput {
  rideService: RideService;
  errorHandlerService: ErrorService;
}

export const rideListUsecase = ({
  rideService,
  errorHandlerService,
}: UseCaseInput): UseCase<RideListInput, RideListOutput | null> => {
  return {
    execute: async (params: RideListInput) => {
      try {
        return rideService.rideList(params);
      } catch (error: unknown) {
        errorHandlerService.handler(error);
        return null;
      }
    },
  };
};
