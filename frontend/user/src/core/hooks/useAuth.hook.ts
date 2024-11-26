import { useContext } from "react";
import { AuthContext } from "../contexts/auth.context";

export const useAuth = (): AuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Context not initialized yet");
  }
  return context;
};
