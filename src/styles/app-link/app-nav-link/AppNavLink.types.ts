import { NavLinkProps } from "react-router-dom";

import { AppLinkVariant } from "@/styles/app-link/AppBaseLink.types";
import { AppTypographyVariant } from "@/styles/app-typography/AppTypography.types";

export type AppNavLinkProps = {
  variant?: Extract<AppLinkVariant, "faded" | "accent">;
  typographyVariant?: AppTypographyVariant;
  children?: string;
} & Omit<NavLinkProps, "children">;
