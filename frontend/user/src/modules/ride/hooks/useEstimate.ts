//import { useAuth } from "../../../core/hooks/useAuth.hook";
import { useState } from "react";
import { EstimateInput, EstimateOutput } from "../usecases/estimate.usecase";
import { estimateRideUseCaseFactory } from "../factories/estimate-ride-usecase.factory";

export interface useEstimateReturn {
  params: EstimateInput;
  result: EstimateOutput | null;
  clear: () => void;
  estimate: () => Promise<void>;
  onChange: (key: string, value: string) => void;
}

export const useEstimate = (): useEstimateReturn => {
  const [params, setParams] = useState<EstimateInput>({
    customerId: "teste",
    destiny: "Boa vista Roraima Brasil",
    origin: "São Luís do Anauá Roraima Brasil",
    // destiny: "Rua Deorsumilo Raimundo Gomes, São Luís do Anauá Roraima Brasil",
    // origin: "Avenida Boa Vista numero 43, São Luís do Anauá Roraima Brasil",
  });
  const [result, setResult] = useState<EstimateOutput | null>(null);
  const estimateRideUseCase = estimateRideUseCaseFactory();
  return {
    params,
    result,
    clear: () => setParams({} as EstimateInput),
    onChange: (key, value) => setParams((curr) => ({ ...curr, [key]: value })),
    estimate: async () => {
      const response = await estimateRideUseCase.execute(params);
      setResult(response);
    },
  };
};
