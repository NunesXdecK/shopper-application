import { Driver } from "./driver.model";

export type GetAvaliableForRideParams = {
  minimumKM: number;
};

export interface DriverRepository {
  getAvaliableForRide: (
    params: GetAvaliableForRideParams
  ) => Promise<Partial<Driver>[]>;
  findById: (id: number) => Promise<Partial<Driver>>;
}
