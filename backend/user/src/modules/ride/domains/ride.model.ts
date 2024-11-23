import { User, UserInput } from "../../user/domains/user.model";

export type RideInput = {
  id: string;
  user: string;
  driver: string;
  originAddressLat: string;
  originAddressLog: string;
  destinyAddressLat: string;
  destinyAddressLog: string;
  createdAt: Date;
  updatedAt: Date;
};

export class Driver {
  id;
  user;
  driver;
  createdAt;
  updatedAt;
  originAddressLat;
  originAddressLog;
  destinyAddressLat;
  destinyAddressLog;
  #error: string = "";

  constructor({
    id,
    user,
    driver,
    createdAt,
    updatedAt,
    originAddressLat,
    originAddressLog,
    destinyAddressLat,
    destinyAddressLog,
  }: Partial<RideInput>) {
    if (!user || user?.length === 0) this.#error = "User not found.";
    if (!driver || driver?.length === 0) this.#error += "Diver not found.";
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
    if (this.#error.length > 0) throw new Error(this.#error);

    this.id = id;
    this.user = user;
    this.driver = driver;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.originAddressLat = originAddressLat;
    this.originAddressLog = originAddressLog;
    this.destinyAddressLat = destinyAddressLat;
    this.destinyAddressLog = destinyAddressLog;
  }
}
