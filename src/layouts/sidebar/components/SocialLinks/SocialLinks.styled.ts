import { Box, styled } from "@mui/material";

export const BoxStyled = styled(Box)(({ theme }) => {
  const smallScreenMediaQuery = theme.breakpoints.down("md");

  return {
    width: 24,
    height: 60,
    marginLeft: 24,
    marginBottom: 44,
    [smallScreenMediaQuery]: {
      width: 53,
      height: 23,
      display: "flex",
      justifyContent: "space-between",
      marginTop: 18,
      marginLeft: 0,
      marginBottom: 0,
    },
  };
});

export const iconStyles = {
  width: 24,
  height: 24,
};
