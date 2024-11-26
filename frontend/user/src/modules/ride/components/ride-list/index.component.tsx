import { useEffect, useState } from "react";
import { useRideList } from "../../hooks/useRideList";
import { RideList } from "./ride-list.component";
import { RideListFilter } from "./ride-list-filter.component";
import { Loadings } from "../../../../components/ui/loadings";

interface Props {
  customerId: string;
}

export const RideListPage = ({ customerId }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { filters, list, driverOptions, handle, handleFilter } =
    useRideList(customerId);

  useEffect(() => {
    if (customerId) {
      handle({
        customerId,
      });
    }
  }, [customerId, handle]);

  if (loading) return;
  return (
    <>
      <RideListFilter
        loading={loading}
        filters={filters}
        options={driverOptions}
        setFilters={handleFilter}
        handle={async () => {
          setLoading(true);
          try {
            await handle(filters);
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        }}
      />
      {loading ? <Loadings.ScaleMessage /> : <RideList list={list} />}
    </>
  );
};
