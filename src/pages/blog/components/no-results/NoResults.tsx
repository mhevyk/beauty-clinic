import Typography from "@mui/material/Typography";

import { BoxStyled } from "@/pages/blog/components/no-results/NoResults.styled";

export default function NoResults() {
  return (
    <BoxStyled>
      {/* TODO: replace Typography with AppTypography and fix ui */}
      <Typography variant="h2" fontWeight={800} lineHeight={2}>
        No Results
      </Typography>
      <Typography variant="paragraph">
        Looks like we couldn’t find what you’re looking for. Try another search.
      </Typography>
    </BoxStyled>
  );
}
