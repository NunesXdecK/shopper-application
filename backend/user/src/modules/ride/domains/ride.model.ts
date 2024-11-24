import { Params } from "../../../core/domains/route-calculator-service.type";
import { User, UserInput } from "../../user/domains/user.model";

export type RideInput = {
  id: string;
  user: string;
  duration: string;
  originAddress: string;
  destinyAddress: string;
  originAddressLat: string;
  originAddressLog: string;
  destinyAddressLat: string;
  destinyAddressLog: string;
  value: number;
  driver: number;
  distance: number;
  createdAt: Date;
  updatedAt: Date;
};

export class Ride {
  id;
  user;
  value;
  driver;
  distance;
  duration;
  createdAt;
  updatedAt;
  originAddressLat;
  originAddressLog;
  destinyAddressLat;
  destinyAddressLog;
  originAddress: string;
  destinyAddress: string;
  #error: string = "";

  constructor({
    id,
    user,
    value,
    driver,
    distance,
    duration,
    createdAt,
    updatedAt,
    originAddress,
    destinyAddress,
    originAddressLat,
    originAddressLog,
    destinyAddressLat,
    destinyAddressLog,
  }: Partial<RideInput>) {
    if (!user || user?.length === 0) this.#error = "User not found.";
    const isLocation = this.isLocation(originAddress, destinyAddress);
    if (isLocation) {
      if (
        !originAddressLat ||
        !originAddressLog ||
        originAddressLat?.length === 0 ||
        originAddressLog?.length === 0
      )
        this.#error += "Origin address not found.";
      if (
        !destinyAddressLat ||
        !destinyAddressLog ||
        destinyAddressLat?.length === 0 ||
        destinyAddressLog?.length === 0
      )
        this.#error += "Destiny address not found.";
      if (
        destinyAddressLat === originAddressLat &&
        destinyAddressLog === originAddressLog
      )
        this.#error += "Origin and destiny address are the same.";
    } else {
      if (!originAddress || originAddress?.length === 0)
        this.#error += "Destiny address not found.";
      if (!destinyAddress || destinyAddress?.length === 0)
        this.#error += "Origin address not found.";
      if (destinyAddress === originAddress)
        this.#error += "Origin and destiny address are the same.";
    }

    if (this.#error.length > 0) throw new Error(this.#error);

    this.id = id;
    this.user = user;
    this.value = value;
    this.driver = driver;
    this.distance = distance;
    this.duration = duration;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.originAddressLat = originAddressLat;
    this.originAddressLog = originAddressLog;
    this.destinyAddressLat = destinyAddressLat;
    this.destinyAddressLog = destinyAddressLog;
    this.originAddress = originAddress as string;
    this.destinyAddress = destinyAddress as string;
  }

  get getRoute(): Params {
    const isLocation = this.isLocation();
    if (isLocation) {
      return {
        isLocation,
        origin: {
          latitude: Number(this.originAddressLat),
          longitude: Number(this.originAddressLog),
        },
        destination: {
          latitude: Number(this.destinyAddressLat),
          longitude: Number(this.destinyAddressLog),
        },
      };
    }
    return {
      isLocation,
      origin: this.originAddress,
      destination: this.destinyAddress,
    }
  }

  isLocation(origin = this.originAddress, destiny = this.destinyAddress) {
    const hasOrigin = origin && origin.length > 0;
    const hasDestiny = destiny && destiny.length > 0;
    return !hasOrigin || !hasDestiny;
  }

  async calculate(driverValue: number, kilometers: number) {
    return driverValue * kilometers;
  }
}
