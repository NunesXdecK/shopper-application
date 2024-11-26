import { useCallback, useState } from "react";
import { Options } from "../../../components/ui/forms/select.component";
import { RideListInput, RideListItem } from "../usecases/ride-list.usecase";
import { rideListUseCaseFactory } from "../factories/ride-list-usecase.factory";

export interface useRideListReturn {
  filters: RideListInput;
  list: RideListItem[];
  driverOptions: Options[];
  handle: (params: RideListInput) => void;
  handleFilter: (key: string, value: string) => void;
}

export const useRideList = (customerId: string = ""): useRideListReturn => {
  const [driverOptions] = useState<Options[]>([
    { value: "1", label: "Homer Simpson" },
    { value: "2", label: "Dominic Toretto" },
    { value: "3", label: "James Bond" },
  ]);
  const [filters, setFilters] = useState<RideListInput>({
    driverId: 0,
    customerId: customerId,
  });
  const [list, setList] = useState<RideListItem[]>([]);

  const handle = useCallback(async (params: RideListInput) => {
    if (!params) return;
    const rideListUsecase = rideListUseCaseFactory();
    const result = await rideListUsecase.execute(params);
    setList(result.rides);
  }, []);

  return {
    list,
    filters,
    driverOptions,
    handle,
    handleFilter: (key: string, value: string) => {
      setFilters((curr) => ({ ...curr, [key]: value }));
    },
  };
};
