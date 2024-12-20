import { createContext } from "react";

export interface AlertMessage {
  id?: string;
  message?: string;
  type?: "INFORMATION" | "ERROR";
}

export interface AlertContext {
  doAlert: (message: AlertMessage) => void;
}

export const AlertContext = createContext<AlertContext | undefined>(undefined);
