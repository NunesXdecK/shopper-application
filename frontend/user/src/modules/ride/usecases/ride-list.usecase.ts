import { RideService } from "../domains/ride-service.type";
import { UseCase } from "../../../core/domains/use-case.type";

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
}

export const rideListUsecase = ({
  rideService,
}: UseCaseInput): UseCase<RideListInput, RideListOutput> => {
  return {
    execute: async (params: RideListInput) => rideService.rideList(params),
  };
};
