import { LogService } from "../../core/domains/log-service.type";

export class ConsoleLogService implements LogService {
  log(message: any) {
    console.log(message);
  }
}
