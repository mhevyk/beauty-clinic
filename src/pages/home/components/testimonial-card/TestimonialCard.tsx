import { useState } from "react";

import {
  BoxStyled,
  StackStyled,
} from "@/pages/home/components/testimonial-card/TestimonialCard.styled.ts";
import { TESTIMONIALS_ANIMATION_DURATION } from "@/pages/home/data/constants.ts";
import { Quote } from "@/pages/home/data/quotes.ts";
import useInterval from "@/pages/home/hooks/use-interval/useInterval.ts";

import PointButton from "../point-button/PointButton.tsx";
import QuoteItem from "../quote-item/QuoteItem.tsx";

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
