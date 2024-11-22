import express, { Application } from "express";
import { HttpServer } from "../../core/domains/http-server.type";
import { HttpRouter } from "../../core/domains/http-router.type";
import { RequestHandler } from "../../core/domains/types.type";

export class ExpressHttpServer implements HttpServer<RequestHandler> {
  #httpApp: Application;

  constructor() {
    this.#httpApp = express();
  }

  useMiddleware(handler: RequestHandler): void {
    this.#httpApp.use(handler as any);
  }

  useRouter(path: string, handler?: HttpRouter): void {
    if (handler) {
      this.#httpApp.use(path, handler as any);
    } else {
      this.#httpApp.use(path);
    }
  }

  get app(): Application {
    return this.#httpApp;
  }
}
