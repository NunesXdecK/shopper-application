import { BrowserRouter as Router } from "react-router-dom";
import { PublicRoutes } from "./public.router";
import { AuthenticatedRoutes } from "./authenticated.router";
import { useAuth } from "../core/hooks/useAuth.hook";

export const AppRouter = () => {
  const { authenticated } = useAuth();

  return (
    <Router>
      {authenticated ? <AuthenticatedRoutes /> : <PublicRoutes />}
    </Router>
  );
};
