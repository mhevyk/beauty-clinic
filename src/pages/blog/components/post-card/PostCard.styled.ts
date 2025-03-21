import { Box, Button, IconButton, styled } from "@mui/material";

import AppTypography from "@/styles/app-typography/AppTypography";
import { AppTypographyProps } from "@/styles/app-typography/AppTypography.types";

type BoxImageStyledProps = {
  isLoading: boolean;
  shouldShowImagePlaceholder: boolean;
};

export const BoxStyled = styled("li")({
  backgroundColor: "#fff",
  maxWidth: "27rem",
  listStyleType: "none",
  "& a:active": {
    color: "#000",
  },
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
export const ShareButtonStyled = styled(IconButton)({
  "&:hover": { backgroundColor: "transparent" },
  "&:active": { backgroundColor: "transparent" },
});
export const TransparentButton = styled(Button)({
  padding: 0,
  display: "block",
  minWidth: 0,
});
export const BoxImageStyled = styled(Box, {
  shouldForwardProp: prop =>
    prop !== "isLoading" && prop !== "shouldShowImagePlaceholder",
})<BoxImageStyledProps>(({ theme, isLoading, shouldShowImagePlaceholder }) => ({
  minWidth: "170px",
  minHeight: "170px",
  backgroundColor: theme.palette.primary.main,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  opacity: isLoading ? 0.3 : 1,
  "& img": {
    width: shouldShowImagePlaceholder ? "100px" : "100%",
  },
}));

export const PostTitle = styled(AppTypography)<AppTypographyProps>({
  margin: "0 0 1rem 0",
  fontWeight: 800,
});
