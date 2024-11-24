import { UseCase } from "../../../core/domains/use-case.type";
import { User, UserInput } from "../domains/user.model";
import { UserRepository } from "../domains/user-repository.type";

type Props = {
  userRepository: UserRepository;
};

export class CreateUserUseCase implements UseCase<Partial<UserInput>, User> {
  #userRepository;

  constructor({ userRepository }: Props) {
    this.#userRepository = userRepository;
  }

  async execute(params: Partial<UserInput>): Promise<User> {
    try {
      const user = new User(params);
      return this.#userRepository.create(user);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
