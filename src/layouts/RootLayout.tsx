import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "@layouts/Sidebar";
import { Container, styled } from "@mui/material";
import Footer from "./Footer";

const SidebarOmitWrapper = styled(Container)(({ theme }) => ({
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
      <SidebarOmitWrapper maxWidth="xxl">
        <Outlet />
        <Footer />
      </SidebarOmitWrapper>
    </>
  );
}
