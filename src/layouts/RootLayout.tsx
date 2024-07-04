import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "@/layouts/Sidebar";
import { Box, styled } from "@mui/material";
import Footer from "./Footer";

const SidebarOmitWrapper = styled(Box)(({ theme }) => ({
  margin: "auto",
  maxWidth: "1900px",
  [theme.breakpoints.up("md")]: {
    paddingLeft: "78px",
  },
}));

export default function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <Sidebar />
      <Navbar />
      <SidebarOmitWrapper>
        <Outlet />
        <Footer />
      </SidebarOmitWrapper>
    </>
  );
}
