import { Ride } from "./ride.model";

export interface RideRepository {
  create: (params: Partial<Ride>) => Promise<void>;
  getAllById: (id: string) => Promise<Partial<Ride[]>>;
}
