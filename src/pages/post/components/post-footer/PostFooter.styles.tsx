import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import theme from "@/theme/theme";

export const SocialsAndCategoriesSection = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  borderTop: `1px solid ${theme.palette.grey[300]}`,
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
  height: "60px",
});

export const ShareSocialsList = styled(List)({
  display: "flex",
  gap: "30px",
  padding: 0,
});

export const SocialsItem = styled(ListItem)({
  padding: 0,
  ".MuiIconButton-root": {
    padding: 0,
    "&:hover svg": {
      // TODO: use color from theme
      color: "#4464a3",
    },
  },
  svg: {
    color: theme.palette.secondary.main,
    transition: "color 0.3s",
  },
});

export const CategoriesList = styled(List)({
  display: "flex",
  gap: "8px",
  padding: 0,
});

export const CategoryItem = styled(ListItem)({
  width: "auto",
  padding: 0,
  fontSize: "14px",
  a: {
    "&:hover": {
      color: "inherit",
    },
  },
});


