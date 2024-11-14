import { styled } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import CaretLeftIconSvg from "@/assets/icons/caret-left.svg";

export const CaretLeftIcon = styled(CaretLeftIconSvg)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

export const PrevMonthButton = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    marginRight: "auto",
  },
}));

export const CaretRightIcon = styled(CaretLeftIcon)({
  transform: "rotate(180deg)",
});

export const NextMonthButton = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    marginLeft: "auto",
  },
}));

export const SelectedMonth = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  fontSize: "16px",
  [theme.breakpoints.up("sm")]: {
    width: "180px",
  },
}));
