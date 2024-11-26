import { Button, Form } from "../../../../components/ui";
import { RideListInput } from "../../usecases/ride-list.usecase";
import { Options } from "../../../../components/ui/forms/select.component";

interface Props {
  loading: boolean;
  options: Options[];
  filters: RideListInput;
  handle?: () => void;
  setFilters: (key: string, value: string) => void;
}

export const RideListFilter = ({
  options,
  filters,
  loading = false,
  handle,
  setFilters,
}: Props) => {
  return (
    <div>
      <Form.Form
        className="flex gap-4 justify-between sm:max-w-lg"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <div>
          <Form.Label htmlFor="user-id">Usuário</Form.Label>
          <Form.Input
            id="user-id"
            loading={loading}
            className="mt-2"
            value={filters.customerId}
            onChange={(event) =>
              setFilters("customerId", event.currentTarget.value)
            }
            required
          />
        </div>
        <div>
          <Form.Label htmlFor="driver-id">Motorista</Form.Label>
          <Form.Select
            id="driver-id"
            options={options}
            loading={loading}
            className="mt-2"
            value={filters.driverId?.toString()}
            onChange={(event) =>
              setFilters("driverId", event.currentTarget.value)
            }
            required
          />
        </div>
        <Button.Primary
          className="self-end"
          onClick={handle ? () => handle() : undefined}
        >
          Enviar
        </Button.Primary>
      </Form.Form>
    </div>
  );
};
