import { User } from "../domains/user.model";
import { UseCase } from "../../../core/domains/use-case.type";
import { UserRepository } from "../domains/user-repository.type";

type Props = {
  userRepository: UserRepository;
};

export class GetUserByIdUseCase implements UseCase<string, Partial<User>> {
  #userRepository: UserRepository;

  constructor({ userRepository }: Props) {
    this.#userRepository = userRepository;
  }

  async execute(id: string): Promise<Partial<User>> {
    try {
      return this.#userRepository.findById(id);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
