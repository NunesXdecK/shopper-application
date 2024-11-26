//import { useAuth } from "../../../core/hooks/useAuth.hook";
import { userAuthServiceFactory } from "../factories/login-usecase.factory";
import { AuthInput } from "../usecases/login.usecase";

interface Return {
  login: (params: AuthInput) => void;
  logout: () => void;
}

export const useLogin = (): Return => {
  //const { login, logout } = useAuth();
  const loginUsecase = userAuthServiceFactory();
  return {
    login: async (params: AuthInput) => {
      await loginUsecase.execute(params);
    },
    logout: () => {},
  };
};
