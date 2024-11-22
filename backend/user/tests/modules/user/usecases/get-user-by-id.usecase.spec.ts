import { UserRepository } from "../../../../src/modules/user/domains/user-repository.type";
import { User } from "../../../../src/modules/user/domains/user.model";
import { GetUserByIdUseCase } from "../../../../src/modules/user/usecases/get-user-by-id.usecase";

describe("GetUserByIdUseCase", () => {
  let userRepositoryMock: jest.Mocked<Partial<UserRepository>>;
  let getUserByIdUseCase: GetUserByIdUseCase;

  beforeEach(() => {
    userRepositoryMock = {
      findById: jest.fn(),
    } as jest.Mocked<Partial<UserRepository>>;

    getUserByIdUseCase = new GetUserByIdUseCase({
      userRepository: userRepositoryMock as UserRepository,
    });
  });

  it("should return the user when found", async () => {
    const user = new User({
      name: "test",
      email: "test@test",
    });

    (userRepositoryMock.findById as jest.Mock).mockResolvedValue(user);

    const result = await getUserByIdUseCase.execute(user.id);

    expect(userRepositoryMock.findById).toHaveBeenCalledWith(user.id);
    expect(result).toStrictEqual(user);
  });

  it("should throw an error when the user is not found", async () => {
    const errorMessage = "User not found";
    const userRepository = {
      findById: jest.fn(() => {
        throw new Error(errorMessage);
      }),
    } as unknown as UserRepository;
    const getUserByIdUseCase = new GetUserByIdUseCase({ userRepository });

    await expect(getUserByIdUseCase.execute("test")).rejects.toThrow(
      "User not found"
    );
    expect(userRepository.findById).toHaveBeenCalledWith("test");
  });

  it("should call the user repository with the correct id", async () => {
    const user = new User({
      id: "1",
      name: "test",
      email: "test@test",
      password: "password",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    (userRepositoryMock.findById as jest.Mock).mockResolvedValue(user);

    await getUserByIdUseCase.execute("1");

    expect(userRepositoryMock.findById).toHaveBeenCalledWith("1");
  });
});
