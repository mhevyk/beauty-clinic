import { forwardRef } from "react";
import { NavLink } from "react-router-dom";

import classnames from "classnames";

import "@/styles/app-link/AppBaseLink.scss";
import "@/styles/app-link/app-nav-link/AppNavLink.scss";
import { AppNavLinkProps } from "@/styles/app-link/app-nav-link/AppNavLink.types";
import AppTypography from "@/styles/app-typography/AppTypography";

const AppNavLink = forwardRef<HTMLAnchorElement, AppNavLinkProps>(function (
  { variant = "faded", className, children, typographyVariant, ...props },
  ref
) {
  return (
    <NavLink
      className={({ isActive }) =>
        classnames(
          "app-link",
          "app-nav-link",
          `app-link--${variant}`,
          {
            "app-link--active": isActive,
          },
          className
        )
      }
      ref={ref}
      {...props}
    >
      <AppTypography as="span" variant={typographyVariant}>
        {children}
      </AppTypography>
    </NavLink>
  );
});

AppNavLink.displayName = "AppNavLink";

export default AppNavLink;
