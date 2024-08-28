import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";

import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material/styles";

import { CSSInit } from "@/theme/global";
import theme from "@/theme/theme";

type RenderWithProvidersOptions = {
  apiMocks?: MockedResponse[];
};

function renderWithProviders(
  ui: ReactNode,
  { apiMocks = [] }: Partial<RenderWithProvidersOptions> = {}
) {
  return render(
    <ThemeProvider theme={theme}>
      <CSSInit />
      <MockedProvider mocks={apiMocks}>
        <MemoryRouter>{ui}</MemoryRouter>
      </MockedProvider>
    </ThemeProvider>
  );
}

export default renderWithProviders;
