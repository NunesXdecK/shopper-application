import { HttpRouter } from "./http-router.type";

export interface HttpServer<O = unknown> {
  app: any;
  useMiddleware(handler: O): void;
  useRouter(path: string, router: HttpRouter): void;
}
