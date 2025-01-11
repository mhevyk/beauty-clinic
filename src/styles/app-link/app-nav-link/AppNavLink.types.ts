import { NavLinkProps } from "react-router-dom";

import { AppLinkVariant } from "@/styles/app-link/AppBaseLink.types";

export type AppNavLinkProps = {
  variant?: Extract<AppLinkVariant, "faded" | "accent">;
  children?: string;
} & Omit<NavLinkProps, "children">;
