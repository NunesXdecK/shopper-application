import { Ride } from "./ride.model";

export type GetAllByIdParams = {
  driverId: number;
  customerId: string;
};
export interface RideRepository {
  create: (params: Partial<Ride>) => Promise<void>;
  getAllById: (params: GetAllByIdParams) => Promise<Partial<Ride[]>>;
}
