import { useMemo } from "react";
import { Button } from "../../../../components/ui";
import { Icons } from "../../../../components/ui/icons";
import { Driver } from "../../usecases/estimate.usecase";

interface Props {
  driver: Driver;
  loading: boolean;
  select?: (driver: Driver) => void;
}

export const DriverSelectItem = ({ loading = false, driver, select }: Props) => {
  const rating = useMemo(() => {
    const result = [];
    for (let i = 0; i < 5; i++) {
      result.push(
        <Icons.Star
          key={`driver-${driver.id}-rating-start-${i}`}
          className={`w-4 h-4 ${
            i < Number(driver.review.rating)
              ? "text-yellow-400"
              : "text-gray-200"
          }`}
        />
      );
    }
    return result;
  }, [driver]);
  return (
    <li key={driver.id}>
      <div className="py-5">
        <div>
          <p className="text-sm/6 font-semibold text-gray-900">{driver.name}</p>
          <p className="text-sm/6 text-gray-900">Veículo: {driver.vehicle}</p>
          <p className="mt-1 text-xs/5 text-gray-500">{driver.description}</p>
          <span className="flex mt-4">{rating.map((star) => star)}</span>
          <p className="text-sm/6 text-gray-900">{driver.review.comment}</p>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm/6 font-semibold text-gray-900">
            Valor: R$ {driver.value}
          </p>
          <Button.Primary
            disabled={loading}
            onClick={select ? () => select(driver) : undefined}
          >
            Selecionar
          </Button.Primary>
        </div>
      </div>
    </li>
  );
};
