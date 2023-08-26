import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AlertProvider } from "./storage/alert-context";
import { CssBaseline, ThemeProvider } from "@mui/material";

import App from "./App";
import { AuthContextProvider } from "./storage/auth-context";
import "./index.css";
import theme from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AlertProvider>
    <AuthContextProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </AuthContextProvider>
  </AlertProvider>
);
