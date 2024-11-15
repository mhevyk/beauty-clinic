import Fade from "@mui/material/Fade";

import {
  BoxInFade,
  TypographyAuthorStyled,
  TypographyDescriptionStyled,
} from "@/pages/home/components/quote-item/QuoteItem.styled";
import { Quote } from "@/pages/home/data/quotes.ts";

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
