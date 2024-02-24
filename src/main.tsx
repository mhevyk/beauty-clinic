import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import router from "./router.tsx";
import { ThemeProvider } from "@mui/material";
import theme from "./theme/theme.tsx";
import { CSSInit } from "./theme/global.tsx";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CSSInit />
      <RouterProvider router={createBrowserRouter(router)} />
    </ThemeProvider>
  </StrictMode>
);
