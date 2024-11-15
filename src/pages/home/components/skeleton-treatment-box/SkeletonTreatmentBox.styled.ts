import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

import theme from "@/theme/theme.ts";

export const SkeletonStyled = styled(Skeleton)({
  paddingTop: 200,
  height: 240,
  width: 240,
});

export const SkeletonTitleStyled = styled(Skeleton)({
  fontSize: "56px",
  width: 220,
  marginTop: 30,
  [theme.breakpoints.down("md")]: {
    fontSize: "28px",
  },
});

export const SkeletonDescriptionStyled = styled(Skeleton)({
  width: 180,
  fontSize: "20px",
});

export const BoxStyled = styled(Box)({
  [theme.breakpoints.up("xs")]: {
    height: 460,
  },
  [theme.breakpoints.up("lg")]: {
    height: 560,
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "20%",
});
