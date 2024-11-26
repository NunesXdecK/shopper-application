import { ReactNode, useCallback, useMemo, useState } from "react";
import { AlertContext, AlertMessage } from "../contexts/alert.context";
import { Alerts } from "../components/alerts";
import { ErrorCodes } from "../enums/errors-codes.enum";
import { ErrorType } from "../domains/backend-error.type";

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider = ({ children }: AlertProviderProps): ReactNode => {
  const [messages, setMessages] = useState<AlertMessage[]>([]);
  const handleMessage = useCallback((message: ErrorType | string): string => {
    const possibleMessages = {
      [ErrorCodes.INVALID_DATA]: "Informações inválidas.",
      [ErrorCodes.INVALID_DRIVER]: "Motorista inválido.",
      [ErrorCodes.INVALID_DISTANCE]: "Distancia inválida.",
      [ErrorCodes.DRIVER_NOT_FOUND]: "Motorista não encontrado.",
      [ErrorCodes.NO_RIDES_FOUND]: "Nenhuma corrida encontrada.",
    };
    return Object.prototype.hasOwnProperty.call(possibleMessages, message)
      ? possibleMessages[message as keyof typeof possibleMessages]
      : message;
  }, []);

  const values = useMemo(
    (): AlertContext => ({
      doAlert: ({
        type = "ERROR",
        message = "Erro desconhecido",
      }: AlertMessage) => {
        const id = (Date.now() + Math.random()).toString();
        setMessages((curr) => [
          ...curr,
          {
            id,
            type,
            message: handleMessage(message),
          },
        ]);

        setTimeout(() => {
          setMessages((curr) => curr.filter((item) => item.id !== id));
        }, 5000);
      },
    }),
    [setMessages, handleMessage]
  );

  return (
    <AlertContext.Provider value={values}>
      {children}
      <div className="fixed bottom-0 right-0 m-4 p-4 ">
        {messages.map(({ id, message = "Erro desconhecido" }) => (
          <Alerts.Error key={`alert-${id}`} message={message} />
        ))}
      </div>
    </AlertContext.Provider>
  );
};
