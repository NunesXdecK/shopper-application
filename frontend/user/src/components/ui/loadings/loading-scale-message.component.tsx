import { RideComponents } from "../../../modules/ride/components";
import { LoadingScale } from "./loading-scale.component";

interface Props {
  message?: string;
}
export const LoadingScaleWithMessage = ({
  message = "Carregando...",
}: Props) => {
  return (
    <div className="mt-10 flex flex-col text-center items-center gap-6">
      <LoadingScale />
      <RideComponents.Title>{message}</RideComponents.Title>
    </div>
  );
};
