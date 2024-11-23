import { ElementRef, ElementType, forwardRef } from "react";

import classnames from "classnames";

import "@/styles/app-typography/AppTypography.scss";
import {
  AppTypographyFontWeight,
  AppTypographyHeadingVariant,
  AppTypographyProps,
  AppTypographyVariant,
} from "@/styles/app-typography/AppTypography.types";

const getDefaultTag = (
  variant: AppTypographyVariant,
  inline: boolean,
  fontWeight: AppTypographyFontWeight,
  oblique: boolean,
  underlined: boolean
): ElementType => {
  if (variant.startsWith("h")) {
    return variant as AppTypographyHeadingVariant;
  }

  const bold = fontWeight === "bold";

  if (bold && !oblique && !underlined) {
    return "strong";
  }

  if (!bold && oblique && !underlined) {
    return "em";
  }

  if (!bold && !oblique && underlined) {
    return "u";
  }

  if (inline) {
    return "span";
  }

  return "p";
};

const AppTypography = forwardRef(function AppTypography<T extends ElementType>(
  {
    variant = "body",
    fontWeight = "regular",
    oblique = false,
    underline = false,
    inline = false,
    as,
    ...props
  }: AppTypographyProps<T>,
  ref: ElementRef<T>
) {
  const TextComponent =
    as ?? getDefaultTag(variant, inline, fontWeight, oblique, underline);

  return (
    <TextComponent
      ref={ref}
      className={classnames("app-typography", `app-typography--${variant}`, {
        "app-typography--bold": fontWeight === "bold",
        "app-typography--underline": underline,
        "app-typography--oblique": oblique,
        "app-typography--inline": inline,
      })}
      {...props}
    />
  );
});

AppTypography.displayName = "AppTypography";

export default AppTypography;
