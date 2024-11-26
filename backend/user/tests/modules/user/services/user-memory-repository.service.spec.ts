import { LogService } from "../../../../src/core/domains/log-service.type";
import { UserMemoryRepository } from "../../../../src/modules/user/services/user-memory-repository.service";

describe("UserMemoryRepository", () => {
  let logServiceMock: jest.Mocked<LogService>;
  let userRepo: UserMemoryRepository;

  beforeEach(() => {
    logServiceMock = {
      log: jest.fn(),
    } as jest.Mocked<LogService>;

    userRepo = new UserMemoryRepository();
  });

  it("should create and store a new user", async () => {
    const userInput = {
      name: "teste",
      email: "teste@test",
    };

    await userRepo.create(userInput);

    const users = await userRepo.get();
    expect(users).toHaveLength(1);
    expect(users[0].name).toBe("teste");
    expect(users[0].email).toBe("teste@test");
  });

  it("should get all users", async () => {
    const userInput1 = {
      id: "1",
      name: "teste",
      email: "teste@test",
      password: "password",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const userInput2 = {
      id: "2",
      name: "testss",
      email: "testss@test",
      password: "password",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await userRepo.create(userInput1);
    await userRepo.create(userInput2);

    const users = await userRepo.get();
    expect(users).toHaveLength(2);
    expect(users[0].name).toBe("teste");
    expect(users[1].name).toBe("testss");
  });

  it("should find a user by id", async () => {
    const userInput = {
      id: "1",
      name: "teste",
      email: "teste@test",
      password: "password",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await userRepo.create(userInput);

    const user = await userRepo.findById("1");
    expect(user.name).toBe("teste");
    expect(user.email).toBe("teste@test");
  });

  it("should throw an error if user not found by id", async () => {
    await expect(userRepo.findById("test")).rejects.toThrow(
      "User not find!"
    );
  });

  it("should update a user", async () => {
    const userInput = {
      id: "1",
      name: "teste",
      email: "teste@test",
      password: "password",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const updatedInput = {
      id: "1",
      name: "teste Updated",
      email: "teste.updated@test",
      password: "newpassword",
      updatedAt: new Date(),
    };

    await userRepo.create(userInput);

    await userRepo.update(updatedInput);

    const user = await userRepo.findById("1");
    expect(user.name).toBe("teste Updated");
    expect(user.email).toBe("teste.updated@test");
  });

  it("should throw an error if id is not informed during update", async () => {
    const userInput = {
      id: "1",
      name: "teste",
      email: "teste@test",
      password: "password",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await userRepo.create(userInput);

    await expect(userRepo.update({ name: "Updated" })).rejects.toThrow(
      "Id not informed."
    );
  });

  it("should throw an error if user not found during update", async () => {
    await expect(
      userRepo.update({ id: "nonexistent-id", name: "Updated" })
    ).rejects.toThrow("User not find!");
  });
});
