import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@mui/material";

import { client } from "@/config/apollo";
import theme from "@/theme/theme.ts";

import App from "./App.tsx";
import { CSSInit } from "./theme/global.tsx";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CSSInit />
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </ThemeProvider>
  </StrictMode>
);
