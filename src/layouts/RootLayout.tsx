import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "@layouts/Sidebar";
import { Box, styled } from "@mui/material";
import Footer from "./Footer";

const PageWrapper = styled(Box)(({ theme }) => {
  const smallScreenMediaQuery = theme.breakpoints.up("md");

  return {
    [smallScreenMediaQuery]: {
      marginLeft: "78px",
    },
  };
});

export default function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <Sidebar />
      <Navbar />
      <PageWrapper>
        <Outlet />
        <Footer />
      </PageWrapper>
    </>
  );
}
