import { ScrollRestoration } from "react-router-dom";

import { styled } from "@mui/material";
import Box from "@mui/material/Box";

import AppSuspenseWithOutlet from "@/components/app-suspense-with-outlet/AppSuspenseWithOutlet";
import Footer from "@/layouts/footer/Footer";
import Navbar from "@/layouts/navbar/Navbar";
import Sidebar from "@/layouts/sidebar/Sidebar";

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
        <AppSuspenseWithOutlet />
        <Footer />
      </SidebarOmitWrapper>
    </>
  );
}
