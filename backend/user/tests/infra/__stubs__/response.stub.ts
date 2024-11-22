import { Response } from "../../../src/core/domains/types.type";

interface ResponseStubProps extends Response {
  finish: () => void;
}

export class ResponseStub implements ResponseStubProps {
  savedBody = {};
  statusCode = 200;
  statusMessage = "OK";
  finish() {}
  json(body: Object) {
    this.savedBody = body;
    return this;
  }
  status(code: number) {
    this.statusCode = code;
    return this;
  }
  send(body: Object) {
    this.savedBody = body;
    this.finish()
    return this;
  }
  on(event: string, callback: () => void) {
    if (event === "finish") {
      this.finish = callback;
    }
  }
}
