import { useEffect, useState } from "react";
import QuoteItem from "./QuoteItem.tsx";
import { Box, Stack, styled } from "@mui/material";
import { Quote } from "@pages/HomePage/components/Testimonials/data/quotes.ts";
import PointButton from "./PointButton.tsx";
import theme from "@theme/theme.ts";

type BoxStyledProps = {
  backgroundColor: string;
};

const BoxStyled = styled(Box)(({ backgroundColor }: BoxStyledProps) => {
  return {
    [theme.breakpoints.up("md")]: {
      height: 662,
    },
    height: 422,
    backgroundColor: backgroundColor,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  };
});

const StackStyled = styled(Stack)({
  position: "relative",
  top: "35%",
});

type TestimonialCardProps = {
  backgroundColor: string;
  quotes: Quote[];
};

export default function TestimonialCard({
  backgroundColor,
  quotes,
}: TestimonialCardProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <BoxStyled backgroundColor={backgroundColor}>
      {quotes.map((quote, index) => (
        <QuoteItem
          key={quote.author}
          quote={quote}
          isSelected={index === selectedIndex}
        />
      ))}
      <StackStyled direction="row">
        {quotes.map((_, index) => (
          <PointButton
            isSelected={index === selectedIndex}
            handleQuoteChange={() => setSelectedIndex(index)}
          />
        ))}
      </StackStyled>
    </BoxStyled>
  );
}
