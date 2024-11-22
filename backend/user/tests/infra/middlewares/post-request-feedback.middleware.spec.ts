import { LogService } from "../../../src/core/domains/log-service.type";
import { Request, Response } from "../../../src/core/domains/types.type";
import { PostRequestFeedbackMiddleware } from "../../../src/infra/middlewares/post-request-feedback.middleware";
import { ResponseStub } from "../__stubs__/response.stub";

describe("PostRequestFeedbackMiddleware", () => {
  let logServiceMock: jest.Mocked<LogService>;
  let middleware: PostRequestFeedbackMiddleware;
  const time = new Date("2023-01-01T12:00:00Z");

  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(time);
    logServiceMock = {
      log: jest.fn(),
    } as jest.Mocked<LogService>;
    middleware = new PostRequestFeedbackMiddleware();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should log the correct message on response finish", () => {
    const request = {
      method: "POST",
      baseUrl: "/api",
      url: "/user",
      params: { id: "123" },
      body: { name: "test" },
    } as unknown as Request;
    const response = new ResponseStub();
    const next = jest.fn();

    const handler = middleware.process(logServiceMock);
    handler(request, response, next);

    const responseBody = { success: true };
    response.send(responseBody);

    expect(response.savedBody).toEqual(responseBody);
    expect(logServiceMock.log).toHaveBeenCalledWith(
      `${time.toISOString()} - [POST] Request on /api/user: 200 - OK\nParams : {"id":"123"}\nBody : {"name":"test"}\nResponse : {"success":true}`
    );
  });

  it("should call next() after processing", () => {
    const request = {} as unknown as Request;
    const response = {
      send: jest.fn(),
      on: jest.fn((event, callback) => {
        if (event === "finish") callback();
      }),
    } as unknown as Response;
    const next = jest.fn();

    const handler = middleware.process(logServiceMock);

    handler(request, response, next);

    expect(next).toHaveBeenCalled();
  });

  it("should overwrite res.send and capture the response body", () => {
    const targetSend = jest.fn();
    const request = {} as unknown as Request;
    const response = {
      send: targetSend,
      on: jest.fn(),
    } as unknown as Response;

    const handler = middleware.process(logServiceMock);

    handler(request, response, jest.fn());

    expect(response.send).toBeDefined();
    expect(response.send).not.toBe(targetSend);
  });
});
