import { ScrollRestoration } from "react-router-dom";

import AppSuspenseWithOutlet from "@/components/app-suspense-with-outlet/AppSuspenseWithOutlet";
import Footer from "@/layouts/footer/Footer";
import Navbar from "@/layouts/navbar/Navbar";
import { SidebarOmitWrapper } from "@/layouts/root-layout/RootLayout.styled";
import Sidebar from "@/layouts/sidebar/Sidebar";

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
