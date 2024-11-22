import { User, UserInput } from "./user.model";

export interface UserRepository {
  get: () => Promise<Partial<User>[]>;
  update: (params: Partial<UserInput>) => Promise<void>;
  create: (params: Partial<UserInput>) => Promise<void>;
  findById: (id: string) => Promise<Partial<User>>;
}
