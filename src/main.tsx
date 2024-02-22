import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import router from "./router.tsx";
import {CssBaseline, ThemeProvider} from "@mui/material";
import Theme from "./theme/Theme.tsx";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
      <ThemeProvider theme={Theme}>
          <CssBaseline/>
          <RouterProvider router={createBrowserRouter(router)} />
      </ThemeProvider>
  </StrictMode>,
);
