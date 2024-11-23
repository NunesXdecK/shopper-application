import { User, UserInput } from "../domains/user.model";
import { UserRepository } from "../domains/user-repository.type";
import { ORMRepository } from "../../../core/domains/ORMRepository.type";

export class UserORMRepository implements UserRepository {
  constructor(private readonly userRepository: ORMRepository<User>) {}

  async get(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error("User not find!");
    }
    return user;
  }

  async create(params: Partial<UserInput>): Promise<void> {
    try {
      new User(params);
      const user = this.userRepository.create(params);
      Object.assign(user, {
        id: undefined,
        updateAt: undefined,
        createdAt: undefined,
      });
      await this.userRepository.save(user);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async update(params: Partial<UserInput>): Promise<void> {
    if (!params.id) throw new Error("Id not informed.");
    const user = await this.findById(params.id);
    Object.assign(user, {
      updateAt: undefined,
    });
    if (!user) throw new Error("User does not exist.");
    await this.userRepository.save({ ...user, ...params });
  }
}
