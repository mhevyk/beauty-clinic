import { Outlet, ScrollRestoration } from "react-router-dom";

import Box from "@mui/material/Box";
import styled from "@mui/material/styles/styled";

import Sidebar from "@/layouts/Sidebar";

import Footer from "./Footer";
import Navbar from "./Navbar";

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
