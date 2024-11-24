import { UseCase } from "../../../core/domains/use-case.type";
import { DriverRepository } from "../domains/driver-repository.type";
import {
  GetAllByIdParams,
  RideRepository,
} from "../domains/ride-repository.type";

type Props = {
  rideRepository: RideRepository;
  driverRepository: DriverRepository;
};
export class RideListUseCase implements UseCase<GetAllByIdParams, any> {
  #rideRepository: RideRepository;
  #driverRepository: DriverRepository;

  constructor({ rideRepository, driverRepository }: Props) {
    this.#driverRepository = driverRepository;
    this.#rideRepository = rideRepository;
  }

  async execute(params: GetAllByIdParams): Promise<any> {
    try {
      if (params.driverId)
        await this.#driverRepository.findById(params.driverId as number);
    } catch (error: any) {
      throw new Error(error);
    }
    const rides = await this.#rideRepository.getAllById(params);
    if (rides.length === 0) throw new Error("No rides found.");
    return rides;
  }
}
