import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import router from "./router.tsx";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <RouterProvider router={createBrowserRouter(router)} />
  </StrictMode>
);
