import express, { Router } from "express";
import { ExpressRouter } from "../../../src/infra/routers/express-http.router";
import { HttpMethods } from "../../../src/core/enums/http-methods.enum";

jest.mock("express", () => ({
  Router: jest.fn().mockImplementation(() => ({
    get: jest.fn(),
    put: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  })),
}));

describe("ExpressRouter", () => {
  let expressRouter: ExpressRouter;
  let mockRouter: Router;

  beforeEach(() => {
    expressRouter = new ExpressRouter();
    mockRouter = expressRouter.getRouter;
  });

  afterAll(() => jest.clearAllMocks());

  it("should call express.Router() when instantiating ExpressRouter", () => {
    expect(express.Router).toHaveBeenCalled();
  });

  it("should set up the GET route correctly", () => {
    const path = "/test";
    const handler = jest.fn();
    expressRouter.get(path, handler);
    expect(mockRouter.get).toHaveBeenCalledWith(path, handler);
  });

  const testCases = [
    {
      method: HttpMethods.GET,
      path: "/test-get",
      handler: jest.fn(),
    },
    {
      method: HttpMethods.PUT,
      path: "/test-put",
      handler: jest.fn(),
    },
    {
      method: HttpMethods.POST,
      path: "/test-post",
      handler: jest.fn(),
    },
    {
      method: HttpMethods.DELETE,
      path: "/test-delete",
      handler: jest.fn(),
    },
  ];

  testCases.forEach(({ method, path, handler }) => {
    it(`should call Router.${method} with correct arguments`, () => {
      expressRouter?.[method](path, handler);

      expect(mockRouter?.[method]).toHaveBeenCalled();
      expect(mockRouter?.[method]).toHaveBeenCalledWith(path, handler);
    });
  });

  it("should return the internal router instance", () => {
    expect(expressRouter.getRouter).toStrictEqual(mockRouter);
  });
});
