import {
  UserRouter,
  UserUseCases,
} from "../../../../src/modules/user/routers/user.router";
import { HttpRouter } from "../../../../src/core/domains/http-router.type";
import { LogService } from "../../../../src/core/domains/log-service.type";
import { CreateUserUseCase } from "../../../../src/modules/user/usecases/create-user.usecase";
import { UpdateUserUseCase } from "../../../../src/modules/user/usecases/update-user.usecase";
import { GetUserByIdUseCase } from "../../../../src/modules/user/usecases/get-user-by-id.usecase";
import { GetUserListUsecase } from "../../../../src/modules/user/usecases/get-user-list.usecase";
import { HttpMethods } from "../../../../src/core/enums/http-methods.enum";

describe("UserRouter", () => {
  let userRouter: UserRouter;
  const mockRouter = {
    getRouter: {},
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    useMiddleware: jest.fn(),
  } as jest.Mocked<HttpRouter<any>>;

  const mockLogService = {
    log: jest.fn(),
  } as jest.Mocked<LogService>;

  let useCases = {
    getUseCase: { execute: jest.fn() } as unknown as GetUserListUsecase,
    createUseCase: { execute: jest.fn() } as unknown as CreateUserUseCase,
    updateUseCase: { execute: jest.fn() } as unknown as UpdateUserUseCase,
    getByIdUseCase: { execute: jest.fn() } as unknown as GetUserByIdUseCase,
  } as UserUseCases;

  const testCases = [
    {
      path: "/",
      request: {},
      method: HttpMethods.GET,
      handler: mockRouter.get,
      useCaseName: "getUseCase",
      useCase: useCases.getUseCase,
    },
    {
      path: "/:id",
      callIndex: 1,
      method: HttpMethods.GET,
      handler: mockRouter.get,
      useCaseName: "getByIdUseCase",
      useCase: useCases.getByIdUseCase,
      request: {
        params: {
          id: "test-id",
        },
      },
    },
    {
      path: "/",
      method: HttpMethods.POST,
      handler: mockRouter.post,
      useCaseName: "createUseCase",
      useCase: useCases.createUseCase,
      request: {
        params: {
          id: "test-id",
        },
      },
    },
    {
      path: "/:id",
      method: HttpMethods.PUT,
      handler: mockRouter.put,
      useCaseName: "updateUseCase",
      useCase: useCases.updateUseCase,
      request: {
        params: {
          id: "test-id",
        },
      },
    },
  ];

  beforeEach(() => {
    userRouter = new UserRouter({
      useCases,
      router: mockRouter,
      logService: mockLogService,
    });
  });

  it("should route returns same /users", () => {
    expect(userRouter.route).toBe("/users");
  });

  it("should router returns same router", () => {
    expect(userRouter.router).toStrictEqual(mockRouter.getRouter);
  });

  it("should useCases returns same useCases", () => {
    expect(userRouter.useCases).toStrictEqual(useCases);
  });

  testCases.forEach(
    ({
      method,
      path,
      handler,
      useCase,
      useCaseName,
      request,
      callIndex = 0,
    }) => {
      it(`should define ${method.toUpperCase()} '${path}' route`, () => {
        expect(handler).toHaveBeenCalledWith(path, expect.any(Function));
      });

      it(`should call ${useCaseName}.execute when ${method.toUpperCase()} '${path}' is triggered`, async () => {
        const response: Partial<Response> = {
          json: async () => response,
          status: (() => response) as any,
        };
        const routerHandler = handler.mock.calls[callIndex][1];
        console.log(routerHandler);
        await routerHandler(request, response);
        expect(useCase.execute).toHaveBeenCalled();
      });

      it(`should trigger an error when ${useCaseName}.execute fail`, async () => {
        const errorMessage = "test";
        (useCase.execute as jest.Mock).mockImplementation(() => {
          throw new Error(errorMessage);
        });

        const response: Partial<Response> = {
          json: jest.fn(async () => response),
          status: jest.fn(() => response) as any,
        };
        const routerHandler = handler.mock.calls[callIndex][1];
        await routerHandler(request, response);
        expect(useCase.execute).toThrow(errorMessage);
        expect(response.status).toHaveBeenCalledWith(500);
        expect(response.json).toHaveBeenCalledWith({ message: errorMessage });

        (useCase.execute as jest.Mock).mockClear();
      });
    }
  );
});
