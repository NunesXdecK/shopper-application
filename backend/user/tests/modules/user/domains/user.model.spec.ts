import {
  User,
  UserInput,
} from "../../../../src/modules/user/domains/user.model";

describe("User", () => {
  it("should create a new user with provided properties", () => {
    const input: Partial<UserInput> = {
      name: "test",
      email: "test@test.com",
    };

    const user = new User(input);

    expect(user).toMatchObject({
      name: input.name,
      email: input.email,
    });

    expect(user.id).toBeDefined();
    expect(user.password).toBeDefined();
    expect(user.createdAt).toBeDefined();
    expect(user.updatedAt).toBeUndefined();
  });

  it("should initialize updatedAt when id is provided", () => {
    const input: Partial<UserInput> = {
      id: "12345",
      name: "test",
      email: "test@test",
      password: "test-test",
    };

    const user = new User(input);

    expect(user).toMatchObject({
      id: input.id,
      name: input.name,
      email: input.email,
      password: input.password,
    });

    expect(user.updatedAt).toBeDefined();
    expect(user.createdAt).toBeUndefined();
  });

  it("should throw an error when name is not provided", () => {
    expect(() => {
      new User({ email: "test@test.com" });
    }).toThrow("Name not informed.");
  });

  it("should generate id and password automatically when not provided", () => {
    const input: Partial<UserInput> = {
      name: "test",
      email: "test@test.com",
    };

    const user = new User(input);

    expect(user.id).toBeDefined();
    expect(user.password).toBeDefined();
  });
});
