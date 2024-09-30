import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";

import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@mui/material";

import App from "@/App.tsx";
import { client } from "@/config/apollo";
import { CSSInit } from "@/theme/global";
import theme from "@/theme/theme";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CSSInit />
      <ApolloProvider client={client}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </ApolloProvider>
    </ThemeProvider>
  </StrictMode>
);
