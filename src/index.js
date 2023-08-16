import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AuthContextProvider } from "./storage/auth-context";
import "./index.css";
import { AlertProvider } from "./storage/alert-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AlertProvider>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </AlertProvider>
);
