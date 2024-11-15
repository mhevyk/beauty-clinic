import { styled } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

type SectionProps = {
  disableBlockCentering?: boolean;
};

export const GridStyled = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    paddingLeft: "32px",
  },
  [theme.breakpoints.up("xl")]: {
    paddingLeft: 0,
    flexWrap: "nowrap",
  },
}));

export const SectionTitle = styled("h5")(({ theme }) => ({
  ...theme.typography.heading,
  fontSize: "16px",
  margin: "0 0 10px 0",
}));

export const BookNowLinkButton = styled(Button)({
  padding: "8px 30px",
  display: "block",
  marginTop: "22px",
  width: "max-content",
}) as typeof Button;

export const Section = styled(Grid, {
  shouldForwardProp: prop => prop !== "disableBlockCentering",
})<SectionProps>(({ theme, disableBlockCentering }) => ({
  [theme.breakpoints.down("md")]: {
    display: "flex",
    flexDirection: "column",
    alignItems: disableBlockCentering ? undefined : "center",
    textAlign: "center",
  },
}));

export const InfoList = styled("ul")({
  fontSize: 16,
  whiteSpace: "nowrap",
  lineHeight: "2rem",
});
