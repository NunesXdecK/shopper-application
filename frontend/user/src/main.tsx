import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { AppRouter } from "./routers/index.router";
import { AuthProvider } from "./core/providers/auth.provider";
import { AlertProvider } from "./core/providers/alert.provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AlertProvider>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </AlertProvider>
  </StrictMode>
);
