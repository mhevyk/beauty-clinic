import { IconButton, Stack, Typography, styled } from "@mui/material";

import CaretLeftIconSvg from "@/assets/icons/caret-left.svg";

import { CalendarControls } from "../types";

const CaretLeftIcon = styled(CaretLeftIconSvg)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

const PrevMonthButton = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    marginRight: "auto",
  },
}));

const CaretRightIcon = styled(CaretLeftIcon)({
  transform: "rotate(180deg)",
});

const NextMonthButton = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    marginLeft: "auto",
  },
}));

const SelectedMonth = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontSize: "16px",
  [theme.breakpoints.up("sm")]: {
    width: "180px",
  },
}));

type CalendarHeaderProps = {
  controls: CalendarControls;
  selectedPageLabel: string;
};

export default function CalendarHeader({
  controls,
  selectedPageLabel,
}: CalendarHeaderProps) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      sx={{ mb: "10px" }}
    >
      <PrevMonthButton onClick={controls.showPreviousPage}>
        <CaretLeftIcon />
      </PrevMonthButton>
      <SelectedMonth>{selectedPageLabel}</SelectedMonth>
      <NextMonthButton onClick={controls.showNextPage}>
        <CaretRightIcon />
      </NextMonthButton>
    </Stack>
  );
}
