import { dateFormattingSerive } from "../../../../core/services/date-formatting.service";
import { RideListItem } from "../../usecases/ride-list.usecase";
import { RideListText } from "./ride-list-text.component";

interface Props {
  ride?: RideListItem;
}

export const RideListItemComponent = ({ ride }: Props) => {
  if (!ride) return <></>;
  return (
    <li className="py-5">
      <div className="flex gap-4 justify-between">
        <div>
          <RideListText
            label="Data"
            value={dateFormattingSerive().formatDate(new Date(ride.date))}
          />
          <RideListText label="Origem" value={ride.origin} breakline />
          <RideListText label="Valor" value={ride.value.toString()} breakline />
        </div>
        <div>
          <RideListText label="Motorista" value={ride.driver.name} />
          <RideListText label="Destino" value={ride.destination} breakline />
          <RideListText label="Distancia (m)" value={ride.distance.toString()} breakline />
        </div>
      </div>
    </li>
  );
};
