import { RideComponents } from "..";
import { RideListItem } from "../../usecases/ride-list.usecase";
import { RideListItemComponent } from "./ride-list-item.component";

interface Props {
  list: RideListItem[];
}

export const RideList = ({ list = [] }: Props) => {
  if (list.length === 0)
    return (
      <RideComponents.Title className="mt-10 text-center">
        Nenhuma corrida encontrada...
      </RideComponents.Title>
    );
  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 sm:mx-auto sm:w-full sm:max-w-lg"
    >
      {list.map((ride) => (
        <RideListItemComponent key={`ride-list-${ride.id}`} ride={ride} />
      ))}
    </ul>
  );
};
