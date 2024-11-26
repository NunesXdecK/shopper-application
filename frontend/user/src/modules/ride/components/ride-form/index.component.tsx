import { RideComponents } from "..";
import { useEstimateReturn } from "../../hooks/useEstimate";
import { Button, Form, Heading } from "../../../../components/ui";

type OmitReturn = {
  result: unknown;
  clear: unknown;
};

interface Props extends Omit<useEstimateReturn, keyof OmitReturn> {
  loading?: boolean;
}
export const RideForm = ({ loading, params, onChange, estimate }: Props) => {
  return (
    <>
      <RideComponents.Title>
        <Heading.Secondary className="text-center">
          Vamos rodar?
        </Heading.Secondary>
      </RideComponents.Title>

      <Form.Holder className="mt-10">
        <Form.Form
          onSubmit={(event) => {
            event.preventDefault();
            estimate();
          }}
          className="space-y-6"
        >
          <div>
            <Form.Label htmlFor="user-id">Usuário</Form.Label>
            <div className="mt-2">
              <Form.Input
                id="user-id"
                loading={loading}
                value={params.customerId}
                onChange={(event) =>
                  onChange("customerId", event.currentTarget.value)
                }
              />
            </div>
          </div>

          <div>
            <Form.Label htmlFor="origin-address">Saída</Form.Label>
            <div className="mt-2">
              <Form.Input
                loading={loading}
                id="origin-address"
                value={params.origin}
                onChange={(event) =>
                  onChange("origin", event.currentTarget.value)
                }
              />
            </div>
          </div>

          <div>
            <Form.Label htmlFor="origin-destination">Destino</Form.Label>
            <div className="mt-2">
              <Form.Input
                loading={loading}
                value={params.destiny}
                id="origin-destination"
                onChange={(event) =>
                  onChange("destiny", event.currentTarget.value)
                }
              />
            </div>
          </div>

          <div>
            <Button.Primary
              type="submit"
              disabled={loading}
              className="flex w-full justify-center "
            >
              {loading ? "Encontrando..." : "Encontrar viagem"}
            </Button.Primary>
          </div>
        </Form.Form>
      </Form.Holder>
    </>
  );
};
