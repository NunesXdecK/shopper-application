import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { DriverInput } from "../../../modules/ride/domains/driver.model";

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
