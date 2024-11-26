import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../core/pages/home.page";

export const AuthenticatedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to='/' />} />
    </Routes>
  );
};
