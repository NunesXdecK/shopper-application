import { RideService } from "../domains/ride-service.type";
import { HttpRequestArgs } from "../../../core/domains/types.type";
import { HttpService } from "../../../core/domains/http-service.type";
import { ErrorService } from "../../../core/domains/error-service.type";
import { ConfirmInput, ConfirmOutput } from "../usecases/confirm.usecase";
import { EstimateInput, EstimateOutput } from "../usecases/estimate.usecase";
import { RideListInput, RideListOutput } from "../usecases/ride-list.usecase";

interface InputProps {
  httpService: HttpService;
  errorHandlerService: ErrorService;
}

export const rideService = ({
  httpService,
  errorHandlerService,
}: InputProps): RideService => {
  const baseUrl = `${import.meta.env.VITE_BACKEND_URL}ride`;
  return {
    rideList: async ({ customerId, driverId }: RideListInput) => {
      try {
        const response = await httpService.get<RideListInput>(
          `${baseUrl}/${customerId}${
            driverId && driverId.toString() !== "0" ? `?driver_id=${driverId}` : ""
          }`
        );
        return response as unknown as RideListOutput;
      } catch (error: unknown) {
        errorHandlerService.handler(error);
        return null;
      }
    },
    confirm: async (params: ConfirmInput) => {
      try {
        const response = await httpService.post<ConfirmInput>(
          `${baseUrl}/confirm`,
          {
            body: JSON.stringify(params),
          } as unknown as HttpRequestArgs
        );
        return response as unknown as ConfirmOutput;
      } catch (error: unknown) {
        errorHandlerService.handler(error);
        return null;
      }
    },
    estimate: async (params: EstimateInput) => {
      try {
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
      } catch (error: unknown) {
        errorHandlerService.handler(error);
        return null;
      }
    },
  };
};
