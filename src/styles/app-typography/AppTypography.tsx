import classnames from "classnames";

// import "@/styles/app-typography/AppTypography.scss";
import {
  AppTypographyFontWeight,
  AppTypographyHeadingVariant,
  AppTypographyProps,
  AppTypographyTag,
  AppTypographyVariant,
} from "@/styles/app-typography/AppTypography.types";

const getDefaultTag = (
  variant: AppTypographyVariant,
  inline: boolean,
  fontWeight: AppTypographyFontWeight,
  oblique: boolean,
  underlined: boolean
): AppTypographyTag => {
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

export default function AppTypography<T extends AppTypographyTag>({
  variant = "body",
  fontWeight = "regular",
  oblique = false,
  underlined = false,
  inline = false,
  as,
  ...props
}: AppTypographyProps<T>) {
  const TextComponent =
    as ?? getDefaultTag(variant, inline, fontWeight, oblique, underlined);

  return (
    <TextComponent
      className={classnames("app-typography", `app-typography--${variant}`, {
        "app-typography--bold": fontWeight === "bold",
        "app-typography--underline": underlined,
        "app-typography--oblique": oblique,
        "app-typography--inline": inline,
      })}
      {...props}
    />
  );
}
