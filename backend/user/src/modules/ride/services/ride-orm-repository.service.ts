import { Ride, RideInput } from "../domains/ride.model";
import { ORMRepository } from "../../../core/domains/orm-repository.type";
import {
  GetAllByIdParams,
  RideRepository,
} from "../domains/ride-repository.type";

export class RideORMRepository implements RideRepository {
  constructor(private readonly rideRepository: ORMRepository<Ride>) {}

  async getAllById({
    customerId,
    driverId,
  }: GetAllByIdParams): Promise<Ride[]> {
    if (!customerId) throw new Error("Id not informed.");
    const rides = await this.rideRepository.find({
      where: {
        customerId,
        ...(driverId ? { driver: { id: driverId } } : {}),
      },
      relations: ["driver"],
    } as any);
    if (!rides) {
      throw new Error("Rides not found.");
    }
    return rides;
  }

  async create(params: Partial<RideInput>): Promise<void> {
    try {
      const validatedRide = new Ride(params);
      const ride = this.rideRepository.create(validatedRide);
      Object.assign(ride, {
        id: undefined,
        updateAt: undefined,
        createdAt: undefined,
      });
      await this.rideRepository.save(ride);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
