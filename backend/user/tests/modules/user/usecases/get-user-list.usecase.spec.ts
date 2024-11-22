import { UserRepository } from "../../../../src/modules/user/domains/user-repository.type";
import { User } from "../../../../src/modules/user/domains/user.model";
import { GetUserListUsecase } from "../../../../src/modules/user/usecases/get-user-list.usecase";

describe("GetUserListUsecase", () => {
  let userRepositoryMock: jest.Mocked<UserRepository>;
  let getUserListUsecase: GetUserListUsecase;

  beforeEach(() => {
    userRepositoryMock = {
      get: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    } as jest.Mocked<UserRepository>;

    getUserListUsecase = new GetUserListUsecase({
      userRepository: userRepositoryMock,
    });
  });

  it("should return the list of users", async () => {
    const users: Partial<User>[] = [
      {
        id: "1",
        name: "test",
        email: "test@test",
      },
      {
        id: "2",
        name: "test2",
        email: "test2@test",
      },
    ];
    userRepositoryMock.get.mockResolvedValue(users);

    const result = await getUserListUsecase.execute();

    expect(result).toEqual(users);
    expect(userRepositoryMock.get).toHaveBeenCalled();
  });

  it("should return an empty list when no users are found", async () => {
    userRepositoryMock.get.mockResolvedValue([]);

    const result = await getUserListUsecase.execute();

    expect(result).toEqual([]);
    expect(userRepositoryMock.get).toHaveBeenCalled();
  });

  it("should call the user repository's get method", async () => {
    await getUserListUsecase.execute();

    expect(userRepositoryMock.get).toHaveBeenCalledTimes(1);
  });
});
