import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "./Navbar";

export default function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <Outlet />
    </>
  );
}
