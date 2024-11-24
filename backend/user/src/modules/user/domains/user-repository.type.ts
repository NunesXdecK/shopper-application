import { User, UserInput } from "./user.model";

export interface UserRepository {
  get: () => Promise<Partial<User>[]>;
  update: (params: Partial<UserInput>) => Promise<User>;
  create: (params: Partial<UserInput>) => Promise<User>;
  findById: (id: string) => Promise<Partial<User>>;
}
