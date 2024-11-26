import { UseCase } from "../../../core/domains/use-case.type";
import { AuthService } from "../../../core/domains/auth-service.type";

export interface AuthInput {
  name: string;
}

export interface AuthOutput {
  id: string;
  success: boolean;
}

interface UseCaseInput {
  authService: AuthService<AuthInput, AuthOutput>;
}

export const loginUsecase = ({
  authService,
}: UseCaseInput): UseCase<AuthInput, AuthOutput> => {
  return {
    execute: async (params: AuthInput) => authService.login(params),
  };
};
