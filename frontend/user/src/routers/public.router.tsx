import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const RideRouter = lazy(() => import("../modules/ride/router/ride.router"));

export const PublicRoutes = () => {
  return (
    <main className="h-[100vh]">
      <Routes>
        <Route
          path="/"
          element={
            <Suspense>
              <RideRouter />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
};
