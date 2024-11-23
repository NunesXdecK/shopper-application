export type DriverInput = {
  id: number;
  tax: number;
  minimumKM: number;
  valuation: number;
  car: string;
  name: string;
  description: string;
  lastValuationMessage: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export class Driver {
  id;
  car;
  tax;
  name;
  minimumKM;
  valuation;
  createdAt;
  updatedAt;
  rideValue;
  description;
  lastValuationMessage;

  constructor({
    id,
    car,
    tax,
    name,
    minimumKM,
    valuation,
    createdAt,
    updatedAt,
    description,
    lastValuationMessage,
  }: Partial<DriverInput>) {
    this.id = id;
    this.car = car;
    this.tax = tax;
    this.name = name;
    this.minimumKM = minimumKM;
    this.valuation = valuation;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.description = description;
    this.lastValuationMessage = lastValuationMessage;
    this.rideValue = 0;
  }

  value(kilometer: number) {
    this.rideValue = Number(this.tax || 0) * kilometer;
  }
}
