import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

import theme from "@/theme/theme";

export const BoxStyled = styled(Box)({
  backgroundColor: theme.palette.primary.main,
  height: "252px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "auto",
  padding: "31px",
  gap: "5px",
});

export const SkeletonTitleStyled = styled(Skeleton)({
  fontSize: "42px",
  width: "100%",
});

export const SkeletonDurationStyled = styled(Skeleton)({
  width: "40%",
  fontSize: "16px",
});

export const SkeletonPriceStyled = styled(Skeleton)({
  width: "25%",
  marginBottom: "auto",
  fontSize: "16px",
});

export const SkeletonButtonStyled = styled(Skeleton)({
  width: "115px",
  height: "40px",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
});
