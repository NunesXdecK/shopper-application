import { LogService } from "../../core/domains/log-service.type";

export class ConsoleLogService implements LogService {
  log(message: unknown) {
    console.log(message);
  }
}
