import { ConfirmInput, ConfirmOutput } from "../usecases/confirm.usecase";
import { EstimateInput, EstimateOutput } from "../usecases/estimate.usecase";
import { RideListInput, RideListOutput } from "../usecases/ride-list.usecase";

export interface RideService {
  confirm: (input: ConfirmInput) => Promise<ConfirmOutput | null>;
  rideList: (input: RideListInput) => Promise<RideListOutput | null>;
  estimate: (input: EstimateInput) => Promise<EstimateOutput | null>;
}
