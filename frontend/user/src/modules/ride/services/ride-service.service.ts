import { RideService } from "../domains/ride-service.type";
import { HttpRequestArgs } from "../../../core/domains/types.type";
import { HttpService } from "../../../core/domains/http-service.type";
import { ConfirmInput, ConfirmOutput } from "../usecases/confirm.usecase";
import { EstimateInput, EstimateOutput } from "../usecases/estimate.usecase";
import { RideListInput, RideListOutput } from "../usecases/ride-list.usecase";

interface InputProps {
  httpService: HttpService;
}

export const rideService = ({ httpService }: InputProps): RideService => {
  const baseUrl = `${import.meta.env.VITE_BACKEND_URL}ride`;
  return {
    rideList: async ({ customerId, driverId }: RideListInput) => {
      const response = await httpService.get<RideListInput>(
        `${baseUrl}/${customerId}${driverId ? `?driver_id=${driverId}` : ""}`
      );
      return response as unknown as RideListOutput;
    },
    confirm: async (params: ConfirmInput) => {
      const response = await httpService.post<ConfirmInput>(
        `${baseUrl}/confirm`,
        {
          body: JSON.stringify(params),
        } as unknown as HttpRequestArgs
      );
      return response as unknown as ConfirmOutput;
    },
    estimate: async (params: EstimateInput): Promise<EstimateOutput> => {
      const response = await httpService.post<EstimateInput>(
        `${baseUrl}/estimate`,
        {
          body: JSON.stringify({
            customer_id: params.customerId,
            origin: params.origin,
            destiny: params.destiny,
          }),
        } as unknown as HttpRequestArgs
      );
      return response as unknown as EstimateOutput;
    },
  };
};
