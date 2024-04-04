import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import router from "./router.tsx";
import { ThemeProvider } from "@mui/material";
import theme from "@theme/theme.ts";
import { CSSInit } from "./theme/global.tsx";
import { ApolloProvider } from "@apollo/client";
import { client } from "@config/apollo-client.ts";
import AuthProvider from "./context/AuthContext.tsx";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CSSInit />
      <ApolloProvider client={client}>
        <AuthProvider>
          <RouterProvider router={createBrowserRouter(router)} />
        </AuthProvider>
      </ApolloProvider>
    </ThemeProvider>
  </StrictMode>
);
