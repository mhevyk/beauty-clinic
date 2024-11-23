import { ComponentPropsWithoutRef, ElementType } from "react";

import { PropsWithAs } from "@/styles/types";

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

export type AppTypographyProps<T extends ElementType = ElementType> =
  PropsWithAs<T> & {
    variant?: AppTypographyVariant;
    fontWeight?: AppTypographyFontWeight;
    oblique?: boolean;
    underline?: boolean;
    inline?: boolean;
  } & Omit<ComponentPropsWithoutRef<T>, "className">;
