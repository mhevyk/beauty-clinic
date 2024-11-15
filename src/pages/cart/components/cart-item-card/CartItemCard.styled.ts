import { alpha } from "@mui/material";
import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

export const BoxStyled = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.4),
  margin: "22px 0",
  padding: "26px",
}));

type BoxImageStyledProps = {
  isLoading: boolean;
  shouldShowImagePlaceholder: boolean;
};

export const BoxImageStyled = styled(Box, {
  shouldForwardProp: prop =>
    prop !== "isLoading" && prop !== "shouldShowImagePlaceholder",
})<BoxImageStyledProps>(({ theme, isLoading, shouldShowImagePlaceholder }) => ({
  minWidth: "170px",
  minHeight: "170px",
  backgroundColor: theme.palette.primary.main,
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  borderRadius: "10px",
  marginRight: "22px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  opacity: isLoading ? 0.3 : 1,
  ...(shouldShowImagePlaceholder && { "& img": { width: "100px" } }),
}));

export const TreatmentImage = styled("img")({
  width: "auto",
  height: "170px",
});

export const DefaultInfoBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

export const DividerStyled = styled(Divider)(({ theme }) => ({
  borderColor: theme.palette.secondary.main,
  "&::before, &::after": {
    borderColor: "inherit",
  },
}));
