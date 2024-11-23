import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { RideInput } from "../../../modules/ride/domains/ride.model";

@Entity()
export class Ride implements RideInput {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  user: string;

  @Column()
  driver: string;

  @Column()
  originAddressLat: string;
  
  @Column()
  originAddressLog: string;

  @Column()
  destinyAddressLat: string;

  @Column()
  destinyAddressLog: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
