import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppContextProvider } from "./Context/AppContext.jsx";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <BrowserRouter>
    <AppContextProvider>
      <Toaster position="top-center" />
      <App />
    </AppContextProvider>
  </BrowserRouter>

  // </StrictMode>,
);
