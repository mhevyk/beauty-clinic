import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "@layouts/Sidebar";

export default function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <Sidebar />
      <Navbar />
      <Outlet />
    </>
  );
}
