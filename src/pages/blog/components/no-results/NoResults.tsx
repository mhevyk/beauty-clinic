import { BoxStyled } from "@/pages/blog/components/no-results/NoResults.styled";
import AppTypography from "@/styles/app-typography/AppTypography";

export default function NoResults() {
  return (
    <BoxStyled>
      <AppTypography variant="h1">No Results</AppTypography>
      <AppTypography>
        Looks like we couldn’t find what you’re looking for. Try another search.
      </AppTypography>
    </BoxStyled>
  );
}
