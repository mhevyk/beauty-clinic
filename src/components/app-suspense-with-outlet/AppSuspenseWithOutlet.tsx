import { ReactNode, Suspense } from "react";
import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

export function AppLoader() {
  return (
    <Box
      data-testid="app-loader"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CircularProgress color="secondary" size={50} />
    </Box>
  );
}

type AppSuspenseWithOutletProps = {
  children?: ReactNode;
};

export default function AppSuspenseWithOutlet({
  children,
}: AppSuspenseWithOutletProps) {
  return <Suspense fallback={<AppLoader />}>{children ?? <Outlet />}</Suspense>;
}
