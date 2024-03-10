import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "@layouts/Sidebar";
import { Container, styled } from "@mui/material";
import Footer from "./Footer";

const PageWrapper = styled(Container)(({ theme }) => ({
  width: "auto",
  [theme.breakpoints.up("md")]: {
    marginLeft: "78px",
  },
}));

export default function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <Sidebar />
      <Navbar />
      <PageWrapper maxWidth={false}>
        <Outlet />
        <Footer />
      </PageWrapper>
    </>
  );
}
