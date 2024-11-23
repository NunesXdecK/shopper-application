import { DataSource } from "typeorm";
import { Driver } from "../entities/driver.entity";
import { Ride } from "../entities/ride.entity";
import { User } from "../entities/user.entity";

export const TypeORM = new DataSource({
  port: 5432,
  logging: false,
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [Driver, Ride, User],
  migrations: ["/migrations/*.ts"],
  subscribers: ["/subscribers/*.ts"],
  synchronize: process.env.NODE_ENV === 'development',
});
