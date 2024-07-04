import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { ThemeProvider } from "@mui/material";
import theme from "@/theme/theme.ts";
import { CSSInit } from "./theme/global.tsx";
import { ApolloProvider } from "@apollo/client";
import { client } from "@config/apollo";
import App from "./App.tsx";

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
