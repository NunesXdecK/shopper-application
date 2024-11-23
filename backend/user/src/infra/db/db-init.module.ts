import "reflect-metadata"; // Obrigatório para TypeORM
import { TypeORM } from "./configs/type-orm.config";
import { ExternalService } from "../../core/domains/external-service.type";
import { DriverSeed } from "./seeds/driver.seed";
import { ConsoleLogService } from "../services/console-log.service";

export class TypeORMPostgresDatabase implements ExternalService {
  name: string = "TypeORMPostgresDatabase";

  async init() {
    try {
      await TypeORM.initialize();
      await DriverSeed.execute({
        dataSource: TypeORM,
        logService: new ConsoleLogService(),
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
