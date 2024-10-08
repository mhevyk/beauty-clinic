import { useState } from "react";

import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { TESTIMONIALS_ANIMATION_DURATION } from "@/pages/home/data/constants.ts";
import { Quote } from "@/pages/home/data/quotes.ts";
import useInterval from "@/pages/home/hooks/use-interval/useInterval.ts";
import theme from "@/theme/theme.ts";

import PointButton from "../point-button/PointButton.tsx";
import QuoteItem from "../quote-item/QuoteItem.tsx";

type BoxStyledProps = {
  backgroundColor: string;
};

const BoxStyled = styled(Box)(({ backgroundColor }: BoxStyledProps) => {
  return {
    [theme.breakpoints.up("lg")]: {
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

  const { startInterval, stopInterval } = useInterval({
    onTick: () =>
      setSelectedIndex(prevIndex => (prevIndex + 1) % quotes.length),
    duration: TESTIMONIALS_ANIMATION_DURATION,
  });

  const handleQuoteChange = (index: number) => {
    stopInterval();
    setSelectedIndex(index);
    startInterval();
  };

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
        {quotes.map((quote, index) => (
          <PointButton
            key={quote.author}
            isSelected={index === selectedIndex}
            handleQuoteChange={() => handleQuoteChange(index)}
          />
        ))}
      </StackStyled>
    </BoxStyled>
  );
}
