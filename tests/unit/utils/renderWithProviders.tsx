import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";

import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { ThemeProvider } from "@mui/material/styles";

import { GetPostCategoriesDocument } from "@/api/generated";
import { CSSInit } from "@/theme/global";
import theme from "@/theme/theme";

const mocks: MockedResponse[] = [
  {
    request: {
      query: GetPostCategoriesDocument,
    },
    result: {
      data: {
        categories: [
          {
            id: "1",
            name: "Category 1",
            slug: "category-1",
          },
        ],
      },
    },
  },
];

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
