import { Middleware } from "../../core/domains/http-middleware.type";
import { LogService } from "../../core/domains/log-service.type";
import { Request, RequestHandler, Response } from "../../core/domains/types.type";

export class PostRequestFeedbackMiddleware implements Middleware<LogService> {
  
  #prepareLog(name: string, atribute: any): string {
    return `${!!atribute ? `\n${name} : ${JSON.stringify(atribute)}` : ""}`;
  }

  process(logService: LogService): RequestHandler<void> {
    const PostRequestFeedbackMiddleware: RequestHandler<void> = async (
      request: Request,
      response: Response,
      next: () => void
    ) => {
      let responseBody: Object = {};
      const originalSend = response.send;
      response.send = function (body: Object) {
        responseBody = body;
        originalSend.call(this, body);
      };
      response.on("finish", () => {
        const params = request.params;
        const body = request.body;
        logService.log(
          `${new Date().toISOString()} - [${request.method}] Request on ${request.baseUrl}${request.url}: ${response.statusCode} - ${response.statusMessage}${this.#prepareLog("Params", params)}${this.#prepareLog("Body", body)}${this.#prepareLog("Response", responseBody)}`
        );
      });
      next();
    };
    return PostRequestFeedbackMiddleware;
  }
}