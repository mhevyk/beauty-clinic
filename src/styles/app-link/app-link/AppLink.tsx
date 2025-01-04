import { ReactNode, forwardRef, isValidElement } from "react";
import { Link } from "react-router-dom";

import classnames from "classnames";

import "@/styles/app-link/AppBaseLink.scss";
import { AppLinkProps } from "@/styles/app-link/app-link/AppLink.types";
import AppTypography from "@/styles/app-typography/AppTypography";

const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>(function (
  { variant = "faded", className, children, ...props },
  ref
) {
  const wrapTextWithTypography = (children: ReactNode) => {
    return isValidElement(children) ? (
      children
    ) : (
      <AppTypography as="span">{children}</AppTypography>
    );
  };

  return (
    <Link
      className={classnames("app-link", `app-link__${variant}`, className)}
      ref={ref}
      {...props}
    >
      {children && wrapTextWithTypography(children)}
    </Link>
  );
});

AppLink.displayName = "AppLink";

export default AppLink;
