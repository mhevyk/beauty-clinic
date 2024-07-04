import { IconButton } from "@mui/material";
import TestimonialButtonClose from "@/assets/icons/testimonial-button-close-icon.svg";
import TestimonialButtonOpen from "@/assets/icons/testimonial-button-open-icon.svg";

type PointButtonProps = {
  isSelected: boolean;
  handleQuoteChange: () => void;
};

export default function PointButton({
  isSelected,
  handleQuoteChange,
}: PointButtonProps) {
  return (
    <IconButton onClick={!isSelected ? handleQuoteChange : undefined}>
      {isSelected ? <TestimonialButtonOpen /> : <TestimonialButtonClose />}
    </IconButton>
  );
}
