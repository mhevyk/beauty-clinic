import { Box, styled } from "@mui/material";

export const BoxStyled = styled("li")({
  backgroundColor: "#fff",
  maxWidth: "27rem",
  listStyleType: "none",
});
export const ImgStyled = styled("img")({
  width: "100%",
});
export const ContentBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "1.7rem",
});
export const PostInfoBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});
export const PostContentBox = styled(Box)({
  paddingBottom: "1rem",
  borderBottom: "1px solid rgba(3,3,3,0.2)",
});
export const StatsBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});
