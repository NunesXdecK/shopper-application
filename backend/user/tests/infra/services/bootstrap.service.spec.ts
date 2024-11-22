import { Module } from "../../../src/core/domains/module.type";
import { HttpServer } from "../../../src/core/domains/http-server.type";
import { LogService } from "../../../src/core/domains/log-service.type";
import { Bootstrap } from "../../../src/infra/services/bootstrap.service";
import { Middleware } from "../../../src/core/domains/http-middleware.type";
import { RequestHandler } from "../../../src/core/domains/types.type";
import { ModuleRouter } from "../../../src/core/domains/module-router.type";
import { MockModule } from "../__mocks__/mock-module.mock";

describe("Bootstrap", () => {
  let moduleMock: jest.Mocked<Module>;
  let httpServerMock: jest.Mocked<HttpServer>;
  let logServiceMock: jest.Mocked<LogService>;
  let middlewareMock: jest.Mocked<Middleware<void, void>>;

  beforeEach(() => {
    httpServerMock = {
      useMiddleware: jest.fn(),
      useRouter: jest.fn(),
      app: {},
    } as unknown as jest.Mocked<HttpServer>;

    logServiceMock = {
      log: jest.fn(),
    } as jest.Mocked<LogService>;

    middlewareMock = {
      process: () => jest.fn() as RequestHandler<void>,
    } as jest.Mocked<Middleware<void, void>>;

    moduleMock = {
      name: "TestModule",
      router: {
        route: "/test",
        router: {},
      },
    } as jest.Mocked<Module>;
  });

  it("should initialize the server and log the initialization message", () => {
    new Bootstrap({
      httpServer: httpServerMock,
      logService: logServiceMock,
      middlewares: [],
      modules: [],
    });

    expect(httpServerMock.useMiddleware).not.toHaveBeenCalled();
    expect(httpServerMock.useRouter).not.toHaveBeenCalled();
    expect(logServiceMock.log).toHaveBeenCalledWith(
      "[Bootstrap] Server initialized."
    );
  });

  it("should register middlewares and log their initialization", () => {
    const midMock = middlewareMock.process();
    new Bootstrap({
      httpServer: httpServerMock,
      logService: logServiceMock,
      middlewares: [midMock],
      modules: [],
    });

    expect(httpServerMock.useMiddleware).toHaveBeenCalledWith(midMock);
    expect(logServiceMock.log).toHaveBeenCalledWith(
      "[Middleware][mockConstructor] Initialized."
    );
  });

  it("should register modules and log their initialization", () => {
    new Bootstrap({
      httpServer: httpServerMock,
      logService: logServiceMock,
      middlewares: [],
      modules: [moduleMock, new MockModule() as unknown as Module],
    });

    expect(httpServerMock.useRouter).toHaveBeenCalledWith(
      moduleMock.router.route,
      moduleMock.router.router
    );
    expect(logServiceMock.log.mock.calls).toEqual([
      ["[Module][TestModule] Initialized."],
      ["[Module][MockModule] Initialized."],
      ["[Bootstrap] Server initialized."],
    ]);
  });

  it("should return the httpServer app via the app getter", () => {
    const bootstrap = new Bootstrap({
      httpServer: httpServerMock,
      logService: logServiceMock,
      middlewares: [],
      modules: [],
    });

    expect(bootstrap.app).toBe(httpServerMock.app);
  });

  it("should log errors when middleware registration fails", () => {
    const errorMessage = "Error";
    (httpServerMock.useMiddleware as jest.Mock).mockImplementation(() => {
      throw new Error(errorMessage);
    });
    const FailingMiddleware = () => {
      throw new Error(errorMessage);
    };

    new Bootstrap({
      httpServer: httpServerMock,
      logService: logServiceMock,
      middlewares: [FailingMiddleware],
      modules: [],
    });

    expect(logServiceMock.log).toHaveBeenCalledTimes(3);
    expect(logServiceMock.log.mock.calls).toEqual([
      ["[Middleware][FailingMiddleware] Failed to initialize."],
      [errorMessage],
      ["[Bootstrap] Server initialized."],
    ]);
  });

  it("should log errors when module registration fails", () => {
    const errorMessage = "Erro";
    (httpServerMock.useRouter as jest.Mock).mockImplementation(() => {
      throw new Error(errorMessage);
    });
    const failingModule: Module = {
      router: { route: "/fail", router: {} } as ModuleRouter,
      name: "FailingModule",
    };

    new Bootstrap({
      httpServer: httpServerMock,
      logService: logServiceMock,
      middlewares: [],
      modules: [failingModule, new MockModule as unknown as Module],
    });

    expect(logServiceMock.log).toHaveBeenCalledTimes(5);
    expect(logServiceMock.log.mock.calls).toEqual([
      ["[Module][FailingModule] Failed to initialize."],
      [errorMessage],
      ["[Module][MockModule] Failed to initialize."],
      [errorMessage],
      ["[Bootstrap] Server initialized."],
    ]);
  });
});
