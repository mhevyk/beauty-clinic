import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { App } from "./App.tsx";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
