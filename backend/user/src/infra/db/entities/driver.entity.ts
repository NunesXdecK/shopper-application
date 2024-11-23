import {
  Entity,
  Column,
  OneToMany,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { DriverInput } from "../../../modules/ride/domains/driver.model";
import { Ride } from "./ride.entity";

@Entity()
export class Driver implements DriverInput {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastValuationMessage: string;

  @Column()
  car: string;

  @Column("float")
  tax: number;

  @Column("float")
  minimumKM: number;

  @Column()
  valuation: number;

  @Column()
  description: string;

  @OneToMany(() => Ride, (ride) => ride.driver)
  rides: Ride[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
