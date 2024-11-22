import { UserRepository } from "../../../../src/modules/user/domains/user-repository.type";
import { User } from "../../../../src/modules/user/domains/user.model";
import { UpdateUserUseCase } from "../../../../src/modules/user/usecases/update-user.usecase";

describe("UpdateUserUseCase", () => {
  let userRepositoryMock: jest.Mocked<Partial<UserRepository>>;
  let updateUserUseCase: UpdateUserUseCase;

  beforeEach(() => {
    userRepositoryMock = {
      update: jest.fn(),
    } as jest.Mocked<Partial<UserRepository>>;

    updateUserUseCase = new UpdateUserUseCase({
      userRepository: userRepositoryMock as UserRepository,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call the user repository update method", async () => {
    const userInput = {
      id: "test-id",
      name: "test",
      email: "test@test",
    };

    await updateUserUseCase.execute(userInput);

    expect(userRepositoryMock.update).toHaveBeenCalledWith(
      expect.objectContaining({
        name: userInput.name,
        email: userInput.email,
      })
    );
  });

  it("should throw an error when pass worng argument", async () => {
    const userInput = {
      name: "test",
      email: "test@test",
    };

    await expect(updateUserUseCase.execute(userInput)).rejects.toThrow(
      "No id informed."
    );
  });

  it("should throw an error when repository fail", async () => {
    const userInput = {
      id: "test-id",
      name: "test",
      email: "test@test",
    };

    const userRepository = {
      update: jest.fn(() => {
        throw new Error("error");
      }),
    } as unknown as UserRepository;

    const updateUserUseCase = new UpdateUserUseCase({
      userRepository,
    });

    await expect(updateUserUseCase.execute(userInput)).rejects.toThrow("error");
  });
});
