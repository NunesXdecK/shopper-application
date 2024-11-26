import { Navigate, Route, Routes } from "react-router-dom";
import { Ride } from "../pages/ride.page";

const RideRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Ride />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RideRouter;
