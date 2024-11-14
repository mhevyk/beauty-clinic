import { Box, Skeleton, styled } from "@mui/material";

export const BlogTabsToolbar = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const BlogTabsStack = styled(Box)({
  display: "flex",
  gap: "40px",
});

export const CategorySkeleton = styled(Skeleton)({
  width: "90px",
});
