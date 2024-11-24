import "reflect-metadata"; // Obrigatório para TypeORM
import { TypeORM } from "./configs/type-orm.config";
import { ExternalService } from "../../core/domains/external-service.type";
import { DriverSeed } from "./seeds/driver.seed";
import { ConsoleLogService } from "../services/console-log.service";
import { LogService } from "../../core/domains/log-service.type";

export class TypeORMPostgresDatabase implements ExternalService {
  name: string = "TypeORMPostgresDatabase";
  #logService: LogService;
  #isRetry: boolean;

  constructor(logService: LogService) {
    this.#logService = logService;
    this.#isRetry = false;
  }

  async init() {
    try {
      await TypeORM.initialize();
      await DriverSeed.execute({
        dataSource: TypeORM,
        logService: new ConsoleLogService(),
      });
      if (this.#isRetry) {
        this.#isRetry = false;
        this.#logService.log(
          `[ExternalService][${this.constructor.name}] Initialized.`
        );
      }
    } catch (error: any) {
      if (
        error.message.includes("connect ECONNREFUSED") ||
        error.message.includes("the database system is starting up")
      )
        this.retry();
      throw new Error(error);
    }
  }

  async retry() {
    this.#isRetry = true;
    let secondsToRetry = 0;
    const interval: NodeJS.Timeout = setInterval(() => {
      if (secondsToRetry < 5) {
        this.#logService.log(
          `[${this.constructor.name}] Connection retry in ${
            5 - secondsToRetry
          } seconds.`
        );
        secondsToRetry++;
      } else {
        this.#logService.log(`[${this.constructor.name}] Retrying connection.`);
        this.init();
        clearInterval(interval);
      }
    }, 1000);
  }
}
