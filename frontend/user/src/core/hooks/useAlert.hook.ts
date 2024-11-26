import { useContext } from "react";
import { AlertContext } from "../contexts/alert.context";

export const useAlert = (): AlertContext => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("Context not initialized yet");
  }
  return context;
};
