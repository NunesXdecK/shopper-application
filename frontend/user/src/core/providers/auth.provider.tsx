import { ReactNode, useMemo, useState } from "react";
import { AuthContext } from "../contexts/auth.context";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps): ReactNode => {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const values = useMemo(
    () => ({
      authenticated,
      login: () => setAuthenticated(true),
      logout: () => setAuthenticated(false),
    }),
    [authenticated, setAuthenticated]
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
