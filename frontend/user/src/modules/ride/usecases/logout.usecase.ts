import { UseCase } from "../../../core/domains/use-case.type";
import { AuthService } from "../../../core/domains/auth-service.type";

interface UseCaseInput {
  authService: AuthService<void, void>;
}

export const LogoutUsecase = ({
  authService,
}: UseCaseInput): UseCase<void, void> => {
  return {
    execute: async () => authService.logout(),
  };
};
