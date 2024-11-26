import { ReactNode, useMemo, useState } from "react";
import { AlertContext, AlertMessage } from "../contexts/alert.context";
import { Alerts } from "../components/alerts";

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider = ({ children }: AlertProviderProps): ReactNode => {
  const [messages, setMessages] = useState<AlertMessage[]>([
    {
      message: "isso é um teste mesmo",
      type: "ERROR",
    },
  ]);

  const values = useMemo(
    (): AlertContext => ({
      doAlert: (message: AlertMessage) =>
        setMessages((curr) => [...curr, message]),
    }),
    [setMessages]
  );

  return (
    <AlertContext.Provider value={values}>
      {children}
      <div className="absolute bottom-0 right-0">
        {messages.map((alert) => (
          <Alerts.Error message={alert.message} />
        ))}
      </div>
    </AlertContext.Provider>
  );
};
