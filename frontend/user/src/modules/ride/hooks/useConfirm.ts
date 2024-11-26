import { useAlert } from "../../../core/hooks/useAlert.hook";
import { confirmRideUseCaseFactory } from "../factories/confirm-ride-usecase.factory";
import { ConfirmInput, ConfirmOutput } from "../usecases/confirm.usecase";

export interface useConfirmReturn {
  confirm: (input: ConfirmInput) => Promise<ConfirmOutput | null>;
}

export const useConfirm = (): useConfirmReturn => {
  const { doAlert } = useAlert();
  const confirmUseCase = confirmRideUseCaseFactory();
  return {
    confirm: async (input) => {
      try {
        return confirmUseCase.execute(input);
      } catch (error: unknown) {
        doAlert({
          message: error instanceof Error ? error?.message : undefined,
        });
        return { success: false };
      }
    },
  };
};
