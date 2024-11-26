import { useState } from "react";
import { useAlert } from "../../../core/hooks/useAlert.hook";
import { EstimateInput, EstimateOutput } from "../usecases/estimate.usecase";
import { estimateRideUseCaseFactory } from "../factories/estimate-ride-usecase.factory";

export interface useEstimateReturn {
  params: EstimateInput;
  result: EstimateOutput | null;
  clear: () => void;
  estimate: () => Promise<boolean>;
  onChange: (key: string, value: string) => void;
}

export const useEstimate = (): useEstimateReturn => {
  const { doAlert } = useAlert();
  const [params, setParams] = useState<EstimateInput>({
    origin: "",
    destiny: "",
    customerId: "",
  });
  const [result, setResult] = useState<EstimateOutput | null>(null);
  const estimateRideUseCase = estimateRideUseCaseFactory();
  return {
    params,
    result,
    clear: () => setParams({} as EstimateInput),
    onChange: (key, value) => setParams((curr) => ({ ...curr, [key]: value })),
    estimate: async () => {
      try {
        const response = await estimateRideUseCase.execute(params);
        setResult(response);
        return true;
      } catch (error: unknown) {
        doAlert({
          message: error instanceof Error ? error?.message : undefined,
        });
      }
      return false;
    },
  };
};
