import { Params } from "../../../core/domains/route-calculator-service.type";
import { RideInput } from "./ride.model";

export type ConfirmRideInput = {
  location: string;
  value: number;
  origin: string;
  distance: number;
  duration: string;
  customer_id: string;
  destination: string;
  driver: { id: number; name: string };
};

export class ConfirmRide {
  value;
  distance;
  duration;
  driverName;
  location;
  customerId;
  driverId: number;
  originAddress: string;
  destinyAddress: string;
  originAddressLat: string;
  originAddressLog: string;
  destinyAddressLat: string;
  destinyAddressLog: string;
  #error: string = "";

  constructor({
    value,
    origin,
    driver,
    location,
    distance,
    duration,
    customer_id,
    destination,
  }: Partial<ConfirmRideInput>) {
    if (!value) this.#error = "Value not informed.";
    if (!driver) this.#error += "Driver not informed.";
    if (!driver?.id) this.#error += "Driver id not informed.";
    if (!driver?.name) this.#error += "Driver name not informed.";
    if (!origin) this.#error += "Origin not informed.";
    if (!duration) this.#error += "Duration not informed.";
    if (!distance) this.#error += "Distance not informed.";
    if (!customer_id) this.#error += "Customer id not informed.";
    if (!destination) this.#error += "Destination not informed.";

    if (this.#error.length > 0) throw new Error(this.#error);

    this.value = value;
    this.distance = distance;
    this.duration = duration;
    this.customerId = customer_id;
    this.driverName = driver?.name;
    this.driverId = driver?.id as number;
    this.location = location === "true";
    if (this.location) {
      this.extractOrigin(origin as string);
      this.extractDestiny(destination as string);
    } else {
      this.originAddress = origin as string;
      this.destinyAddress = destination as string;
    }
  }

  extractOrigin(location: string) {
    const latudeLongitude = location.split(":");
    this.originAddressLat = latudeLongitude[0];
    this.originAddressLog = latudeLongitude[1];
  }

  extractDestiny(location: string) {
    const latudeLongitude = location.split(":");
    this.destinyAddressLat = latudeLongitude[0];
    this.destinyAddressLog = latudeLongitude[1];
  }

  get getRoute(): Params {
    if (this.location) {
      return {
        isLocation: this.location,
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
      isLocation: this.location,
      origin: this.originAddress,
      destination: this.destinyAddress,
    };
  }

  async calculate(driverValue: number, kilometers: number) {
    return driverValue * kilometers;
  }

  get inputRide(): Partial<RideInput> & { metters: number } {
    return {
      user: this.customerId,
      driver: this.driverId,
      metters: this.distance as number,
      originAddress: this.originAddress,
      destinyAddress: this.destinyAddress,
      originAddressLat: this.originAddressLat,
      originAddressLog: this.originAddressLog,
      destinyAddressLat: this.destinyAddressLat,
      destinyAddressLog: this.destinyAddressLog,
    };
  }
}
