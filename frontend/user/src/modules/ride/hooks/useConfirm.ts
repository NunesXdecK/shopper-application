import { confirmRideUseCaseFactory } from "../factories/confirm-ride-usecase.factory";
import { ConfirmInput, ConfirmOutput } from "../usecases/confirm.usecase";

export interface useConfirmReturn {
  confirm: (input: ConfirmInput) => Promise<ConfirmOutput>;
}

export const useConfirm = (): useConfirmReturn => {
  const confirmUseCase = confirmRideUseCaseFactory();
  return {
    confirm: async (input) => confirmUseCase.execute(input),
  };
};
