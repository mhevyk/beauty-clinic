import { forwardRef } from "react";

import classNames from "classnames";

import "@/styles/app-quote/AppQuote.scss";
import { AppQuoteProps } from "@/styles/app-quote/AppQuote.types";
import AppTypography from "@/styles/app-typography/AppTypography";

const AppQuote = forwardRef<HTMLQuoteElement, AppQuoteProps>(
  ({ className, ...props }, ref) => {
    return (
      <AppTypography
        ref={ref}
        as="blockquote"
        variant="accent"
        oblique
        className={classNames("app-quote", className)}
        {...props}
      />
    );
  }
);

AppQuote.displayName = "AppQuote";

export default AppQuote;
