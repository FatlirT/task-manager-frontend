import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./router";
import "./main.css";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <div className="mt-6">
          <Router />
        </div>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode >
);
