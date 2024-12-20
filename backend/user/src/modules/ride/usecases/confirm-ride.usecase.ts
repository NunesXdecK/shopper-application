import { Driver } from "../domains/driver.model";
import { Ride, RideInput } from "../domains/ride.model";
import { UseCase } from "../../../core/domains/use-case.type";
import { DriverRepository } from "../domains/driver-repository.type";
import { DistanceHelper } from "../../../core/utils/distance.helper";
import { RideRepository } from "../domains/ride-repository.type";

type Params = Partial<RideInput>;

type Props = {
  rideRepository: RideRepository;
  distanceHelper: DistanceHelper;
  driverRepository: DriverRepository;
};
export class ConfirmRideUseCase implements UseCase<Params, any> {
  #distanceHelper: DistanceHelper;
  #rideRepository: RideRepository;
  #driverRepository: DriverRepository;

  constructor({ rideRepository, distanceHelper, driverRepository }: Props) {
    this.#rideRepository = rideRepository;
    this.#distanceHelper = distanceHelper;
    this.#driverRepository = driverRepository;
  }

  async execute(params: Params): Promise<void> {
    try {
      const ride = new Ride(params);
      const driver = await this.#driverRepository.findById(
        ride.driver as number
      );
      if (
        this.#distanceHelper.metterToKilometer(params.distance as number) <
        Number(driver?.minimumKM || 0)
      )
        throw new Error("KM lower than minimum.");
      this.#rideRepository.create(ride);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
