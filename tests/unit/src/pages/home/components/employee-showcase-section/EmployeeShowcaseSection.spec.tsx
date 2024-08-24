import { screen } from "@testing-library/react";

import renderWithProviders from "@tests/unit/utils/renderWithProviders.tsx";

import EmployeeShowcaseSection from "@/pages/home/components/employee-showcase-section/EmployeeShowcaseSection.tsx";

describe("<EmployeeShowcaseSection />", () => {
  beforeEach(() => {
    renderWithProviders(<EmployeeShowcaseSection />);
  });

  it("should render the employee description", () => {
    const employeeDescription = screen.getByText(/Meet lily/i);
    expect(employeeDescription).toBeInTheDocument();
  });

  it("should render the title", () => {
    const employeeTitle = screen.getByText(/Hi, I'm Lily/i);
    expect(employeeTitle).toBeInTheDocument();
  });

  it("should render the employeeSummary", () => {
    const employeeSummary = screen.getByTestId("description");
    expect(employeeSummary).toBeInTheDocument();
  });
});
