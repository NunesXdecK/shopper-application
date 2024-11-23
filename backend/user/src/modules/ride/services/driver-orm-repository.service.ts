import { LessThanOrEqual } from "typeorm";
import { ORMRepository } from "../../../core/domains/orm-repository.type";
import {
  DriverRepository,
  GetAvaliableForRideParams,
} from "../domains/driver-repository.type";
import { Driver } from "../domains/driver.model";

export class DriverORMRepository implements DriverRepository {
  constructor(private readonly driverRepository: ORMRepository<Driver>) {}

  async findById(id: number): Promise<Driver> {
    if (!id) throw new Error("Id not informed.");
    const user = await this.driverRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error("User not find.");
    }
    return user;
  }

  async getAvaliableForRide(
    params: Partial<GetAvaliableForRideParams>
  ): Promise<Driver[]> {
    if (!params) throw new Error("No params was informed.");
    if (!params.minimumKM) throw new Error("No minimal KM was informed.");
    try {
      return await this.driverRepository.find({
        where: {
          minimumKM: LessThanOrEqual(params.minimumKM) as unknown as number,
        },
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
