import { PropsWithAs } from "@/styles/types";
import { ComponentPropsWithoutRef } from "react";

export type AppTypographyHeadingVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6";

export type AppTypographyDecorativeVariant =
  | "subtitle"
  | "subtitle-small"
  | "concept";

export type AppTypographyBodyVariant = "body" | "caption" | "accent";

export type AppTypographyVariant =
  | AppTypographyHeadingVariant
  | AppTypographyDecorativeVariant
  | AppTypographyBodyVariant;

export type AppTypographyFontWeight = "regular" | "bold";

export type AppTypographyTag =
  | AppTypographyHeadingVariant
  | "strong"
  | "em"
  | "u"
  | "span"
  | "p";

export type AppTypographyProps<T extends AppTypographyTag = AppTypographyTag> =
  PropsWithAs<T> & {
    children?: string;
    variant?: AppTypographyVariant;
    fontWeight?: AppTypographyFontWeight;
    oblique?: boolean;
    underlined?: boolean;
    inline?: boolean;
  } & Omit<ComponentPropsWithoutRef<T>, "children" | "className">;
