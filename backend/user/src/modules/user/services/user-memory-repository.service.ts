import { User, UserInput } from "../domains/user.model";
import { UserRepository } from "../domains/user-repository.type";

export class UserMemoryRepository implements UserRepository {
  #users: User[] = [];

  constructor() {}

  async get(): Promise<User[]> {
    return this.#users;
  }

  async findById(id: string): Promise<User> {
    const user = this.#users.find((user) => id === user.id);
    if (!user) {
      throw new Error("User not find!");
    }
    return user;
  }

  async create(params: Partial<UserInput>): Promise<User> {
    try {
      const user = new User(params);
      this.#users.push(user);
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async update(params: Partial<UserInput>): Promise<User> {
    if (!params.id) throw new Error("Id not informed.");
    const user = await this.findById(params.id);
    const newUser = { ...user, ...params };
    const newUsers = [
      ...this.#users.filter((user) => newUser.id !== user.id),
      newUser,
    ];
    this.#users = newUsers as User[];
    return newUser as unknown as User;
  }
}
