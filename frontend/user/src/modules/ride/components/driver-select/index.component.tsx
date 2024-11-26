import { useCallback } from "react";
import { RideComponents } from "..";
import { Button } from "../../../../components/ui";
import { DriverSelectItem } from "./driver-select-item";
import { Loadings } from "../../../../components/ui/loadings";
import { Driver, EstimateOutput } from "../../usecases/estimate.usecase";

interface Props {
  loading?: boolean;
  onBack: () => void;
  select?: (driver: Driver) => void;
  result?: EstimateOutput | null;
}

export const DriverSelect = ({
  result,
  loading = false,
  onBack,
  select,
}: Props) => {
  const getZoom = useCallback((distance: number) => {
    if (distance < 2000) return 14;
    if (distance < 300000) return 6;
    if (distance === 0) return 21;
    return 1;
  }, []);
  return (
    <>
      <div className="flex justify-center">
        <img
          className="rounded-md"
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${
            result?.origin
          }}&zoom=${getZoom(
            result?.distance || 0
          )}&size=800x400&markers=color:red%7Clabel:S%7C${
            result?.destination
          }&markers=color:blue%7Clabel:D%7C${result?.origin}&key=${
            import.meta.env.VITE_GOOGLE_API_KEY
          }`}
        ></img>
      </div>
      {loading ? (
        <>
          <Loadings.Scale />
          <RideComponents.Title>Confirmando...</RideComponents.Title>
        </>
      ) : (
        <ul role="list" className="divide-y divide-gray-100">
          {result?.option?.map((driver) => (
            <DriverSelectItem
              driver={driver}
              loading={loading}
              select={select ? () => select(driver) : undefined}
              key={`driver-select-item-${driver.id}`}
            />
          ))}
        </ul>
      )}
      <div className="mt-2">
        <Button.Primary disabled={loading} onClick={() => onBack()}>
          Voltar
        </Button.Primary>
      </div>
    </>
  );
};
