import { UserRepository } from "../../../../src/modules/user/domains/user-repository.type";
import { CreateUserUseCase } from "../../../../src/modules/user/usecases/create-user.usecase";

describe("CreateUserUseCase", () => {
  let userRepositoryMock: jest.Mocked<Partial<UserRepository>>;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    userRepositoryMock = {
      create: jest.fn(),
    } as jest.Mocked<Partial<UserRepository>>;

    createUserUseCase = new CreateUserUseCase({
      userRepository: userRepositoryMock as UserRepository,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call the user repository create method", async () => {
    const userInput = {
      name: "test",
      email: "test@test",
    };

    await createUserUseCase.execute(userInput);

    expect(userRepositoryMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: userInput.name,
        email: userInput.email,
      })
    );
  });

  it("should handle errors thrown by the repository", async () => {
    const userInput = {
      name: "test",
      email: "test@test",
    };

    const userRepository = {
      create: jest.fn(() => {
        throw new Error("Database error");
      }),
    } as unknown as UserRepository;

    const createUserUseCase = new CreateUserUseCase({ userRepository });

    await expect(createUserUseCase.execute(userInput)).rejects.toThrow(
      "Database error"
    );

    expect(userRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: userInput.name,
        email: userInput.email,
      })
    );
  });
});
