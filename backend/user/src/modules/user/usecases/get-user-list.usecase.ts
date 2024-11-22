import { UseCase } from "../../../core/domains/use-case.type";
import { User } from "../domains/user.model";
import { UserRepository } from "../domains/user-repository.type";

type Props = {
  userRepository: UserRepository;
};

export class GetUserListUsecase implements UseCase<void, Partial<User>[]> {
  #userRepository;

  constructor({ userRepository }: Props) {
    this.#userRepository = userRepository;
  }

  async execute(): Promise<Partial<User>[]> {
    return this.#userRepository.get();
  }
}
