import { createContext } from "react";

export interface AuthContext {
  authenticated: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContext | undefined>(undefined);
