import { ReactNode, Suspense } from "react";
import { Outlet } from "react-router-dom";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function AppLoader() {
  return (
    <Box
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

type AppSuspenseProps = {
  children?: ReactNode;
};

export default function AppSuspense({ children }: AppSuspenseProps) {
  return <Suspense fallback={<AppLoader />}>{children ?? <Outlet />}</Suspense>;
}
