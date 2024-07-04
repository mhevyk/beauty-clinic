import { render } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { MemoryRouter } from "react-router-dom";
import theme from "@/theme/theme";
import { CSSInit } from "@/theme/global";
import { ReactNode } from "react";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";

const mocks: MockedResponse[] = [];

function renderWithProviders(ui: ReactNode) {
  return render(
    <ThemeProvider theme={theme}>
      <CSSInit />
      <MockedProvider mocks={mocks}>
        <MemoryRouter>{ui}</MemoryRouter>
      </MockedProvider>
    </ThemeProvider>
  );
}

export default renderWithProviders;
