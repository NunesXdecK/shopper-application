import { useState } from "react";
import { RideComponents } from "../components";
import { useConfirm } from "../hooks/useConfirm";
import { useEstimate } from "../hooks/useEstimate";
import { RideForm } from "../components/ride-form/index.component";
import { Steps } from "../../../components/ui/tabs";
import { DriverSelect } from "../components/driver-select/index.component";
import { RideListPage } from "../components/ride-list/index.component";

enum StepsValues {
  FORM = 0,
  DRIVER = 1,
  LIST = 2,
}

type StepsOptions = StepsValues.FORM | StepsValues.DRIVER | StepsValues.LIST;

export const Ride = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [step, setStep] = useState<StepsOptions>(StepsValues.FORM);
  const { params, result, onChange, estimate } = useEstimate();
  const { confirm } = useConfirm();
  return (
    <RideComponents.Holder>
      <Steps.Holder activeId={step}>
        <Steps.Step stepId={StepsValues.FORM} name="Orçar">
          <RideForm
            params={params}
            loading={loading}
            onChange={onChange}
            estimate={async () => {
              setLoading(true);
              try {
                await estimate();
                setStep(StepsValues.DRIVER);
              } catch (error) {
                console.log(error);
              } finally {
                setLoading(false);
              }
            }}
          />
        </Steps.Step>
        <Steps.Step stepId={StepsValues.DRIVER} name="Confirmar">
          <DriverSelect
            loading={loading}
            result={result}
            select={async (driver) => {
              if (!params) return;
              if (!result) return;
              setLoading(false);
              try {
                await confirm({
                  value: driver.value,
                  origin: params.origin,
                  duration: result.duration,
                  destination: params.destiny,
                  customer_id: params.customerId,
                  distance: Number(result?.distance),
                  driver: {
                    id: driver?.id,
                    name: driver?.name,
                  },
                });
                setStep(StepsValues.LIST);
              } catch (error) {
                console.log(error);
              } finally {
                setLoading(true);
              }
            }}
            onBack={() => setStep(StepsValues.FORM)}
          />
        </Steps.Step>

        <Steps.Step stepId={StepsValues.LIST} name="Histórico">
          <RideListPage customerId={params.customerId} />
        </Steps.Step>
      </Steps.Holder>
    </RideComponents.Holder>
  );
};
