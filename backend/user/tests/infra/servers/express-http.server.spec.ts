const useMock = jest.fn();
const expressMock = jest.fn(() => ({
  use: useMock,
}));

jest.mock("express", () => {
  return expressMock;
});

import express from "express";
import { HttpRouter } from "../../../src/core/domains/http-router.type";
import { RequestHandler } from "../../../src/core/domains/types.type";
import { ExpressHttpServer } from "../../../src/infra/servers/express-http.server";

describe("ExpressHttpServer", () => {
  let expressServer: ExpressHttpServer;

  beforeEach(() => {
    expressServer = new ExpressHttpServer();
  });

  it("should call express() when instantiating ExpressHttpServer", () => {
    expect(expressMock).toHaveBeenCalledTimes(1);
  });

  it("should app returns same app", () => {
    expect(expressServer.app).toStrictEqual(express());
  });

  it("should call express.use() when useRouter is called", () => {
    expressServer.useRouter("/");

    expect(useMock).toHaveBeenCalledTimes(1);
    expect(useMock).toHaveBeenCalledWith("/");
  });

  it("should call express.use() when useRouter is called with two params", () => {
    const handler: HttpRouter = {} as HttpRouter;
    expressServer.useRouter("/", handler);

    expect(useMock).toHaveBeenCalledTimes(1);
    expect(useMock).toHaveBeenCalledWith("/", handler);
  });

  it("should call express.use() when useMiddleware is called", () => {
    const handler: RequestHandler = {} as RequestHandler;
    expressServer.useMiddleware(handler);

    expect(useMock).toHaveBeenCalledTimes(1);
    expect(useMock).toHaveBeenCalledWith(handler);
  });
});
