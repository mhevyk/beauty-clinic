import { styled } from "@mui/material";

import UserIconSvg from "@/assets/icons/user-icon.svg";

import AppLink from "@/components/app-link/AppLink";

export const LinkStyled = styled(AppLink)(({ theme }) => ({
  transition: "color 400ms",
  color: theme.palette.secondary.main,
  "&:hover": {
    textDecoration: "none",
  },
}));

export const UserIcon = styled(UserIconSvg)({
  width: 25,
  height: 25,
});

export const LoginLink = styled(LinkStyled)({
  display: "flex",
  alignItems: "center",
  gap: 14,
  "&:hover": {
    color: "rgb(199, 179, 163)",
  },
});
