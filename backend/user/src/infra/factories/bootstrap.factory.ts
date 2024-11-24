import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import { Bootstrap } from "../services/bootstrap.service";
import { RequestHandler } from "../../core/domains/types.type";
import { ExpressHttpServer } from "../servers/express-http.server";
import { ConsoleLogService } from "../services/console-log.service";
import { UserModuleFactory } from "../../modules/user/factories/user-module.factory";
import { PostRequestFeedbackMiddleware } from "../middlewares/post-request-feedback.middleware";
import { ExternalService } from "../../core/domains/external-service.type";
import { TypeORMPostgresDatabase } from "../db/db-init.module";
import { RideModuleFactory } from "../../modules/ride/factories/ride-module.factory";

export class BootstrapFactory {
  static build() {
    const httpServer = new ExpressHttpServer();
    const logService = new ConsoleLogService();
    const modules = [UserModuleFactory.build(), RideModuleFactory.build()];
    const endRequestMiddleware = new PostRequestFeedbackMiddleware().process(
      logService
    );
    const middlewares: RequestHandler<void>[] = [
      express.json() as any,
      cookieParser() as any,
      express.urlencoded({ extended: false }) as any,
      express.static(path.join(__dirname, "public")) as any,
      endRequestMiddleware,
    ];
    const externalServices: ExternalService[] = [
      new TypeORMPostgresDatabase(logService),
    ];
    return new Bootstrap({
      modules,
      httpServer,
      logService,
      middlewares,
      externalServices,
    });
  }
}
