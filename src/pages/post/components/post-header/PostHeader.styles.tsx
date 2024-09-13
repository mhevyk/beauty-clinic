import { Link } from "react-router-dom";

import { styled } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import ThreeDotsVerticalIcon from "@/assets/icons/three-dots-vertical.svg";

import theme from "@/theme/theme";

export const PostSubheaderWrapper = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  margin: "30px 0",
});

export const UserAvatar = styled(Avatar)({
  width: "32px",
  height: "32px",
  marginRight: "10px",
});

export const ListStyled = styled(List)({
  display: "flex",
  gap: "8px",
});

export const ListItemStyled = styled(ListItem)({
  width: "auto",
  padding: 0,
});

export const AuthorDetailsLink = styled(Link)({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  "&:focus": {
    color: "inherit",
  },
});

export const ThreeDotsVerticalIconStyled = styled(ThreeDotsVerticalIcon)({
  width: "19px",
  height: "19px",
  path: {
    fill: theme.palette.secondary.main,
  },
});
