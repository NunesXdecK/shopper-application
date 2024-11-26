import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RideInput } from "../../../modules/ride/domains/ride.model";
import { User } from "./user.entity";
import { Driver } from "./driver.entity";

type RideOmits = {
  user: string;
  driver: number;
};

interface RideEntity extends Omit<RideInput, keyof RideOmits> {
  user: User;
  driver: Driver;
}

@Entity()
export class Ride implements RideEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  customerId: string;

  @Column({ nullable: true })
  originAddress: string;

  @Column({ nullable: true })
  destinyAddress: string;

  @Column({ nullable: true })
  originAddressLat: string;

  @Column({ nullable: true })
  originAddressLog: string;

  @Column({ nullable: true })
  destinyAddressLat: string;

  @Column({ nullable: true })
  destinyAddressLog: string;

  @Column({ nullable: true })
  duration: string;

  @Column({ type: "float", nullable: true })
  distance: number;

  @Column({ type: "float", nullable: true })
  value: number;

  @ManyToOne(() => User, (user) => user.rides, { nullable: true })
  user: User;

  @ManyToOne(() => Driver, (driver) => driver.rides)
  driver: Driver;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
