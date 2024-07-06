import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import styled from "@mui/material/styles/styled";

import theme from "@/theme/theme.ts";

import { Quote } from "../../data/quotes.ts";

const BoxInFade = styled(Box)({
  position: "absolute",
});

const TypographyAuthorStyled = styled("p")({
  ...theme.typography.paragraph,
  textAlign: "center",
  fontSize: "16px",
  letterSpacing: "0.7em",
  textTransform: "uppercase",
});

const TypographyDescriptionStyled = styled("h4")({
  ...theme.typography.heading,
  fontSize: "20px",
  textAlign: "center",
  width: 256,
  textWrap: "balance",
  [theme.breakpoints.up("lg")]: {
    fontSize: "28px",
    width: 310,
  },
});

type QuoteItemProps = {
  isSelected: boolean;
  quote: Quote;
};

export default function QuoteItem({ isSelected, quote }: QuoteItemProps) {
  return (
    <Fade timeout={1000} in={isSelected}>
      <BoxInFade>
        <TypographyAuthorStyled>{quote.author}</TypographyAuthorStyled>
        <TypographyDescriptionStyled>
          {quote.description}
        </TypographyDescriptionStyled>
      </BoxInFade>
    </Fade>
  );
}
