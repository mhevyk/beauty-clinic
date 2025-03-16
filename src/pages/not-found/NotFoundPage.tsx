import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

import AppHelmet from "@/components/app-helmet/AppHelmet";
import AppButton from "@/styles/app-button/AppButton.tsx";
import AppTypography from "@/styles/app-typography/AppTypography.tsx";
import theme from "@/theme/theme.ts";

const BoxStyled = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  width: "100vw",
  backgroundColor: "#f8ebe1",
});

export default function NotFoundPage() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const textSize = isSmallScreen ? "caption" : "accent";

  return (
    <AppHelmet title="Not found">
      <BoxStyled>
        <AppTypography variant={isSmallScreen ? "h1" : "concept"}>
          404
        </AppTypography>
        <AppTypography variant={isSmallScreen ? "h5" : "h3"}>
          Oops! Page Not Found.
        </AppTypography>
        <AppTypography variant={textSize}>
          The page you are looking for doesn’t exist or has
        </AppTypography>
        <AppTypography variant={textSize}>been removed.</AppTypography>
        <br />
        <AppButton to="/">Back to Home</AppButton>
      </BoxStyled>
    </AppHelmet>
  );
}
