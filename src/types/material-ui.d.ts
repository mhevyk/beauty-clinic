import { CSSProperties } from "react";

import { SimplePaletteColorOptions } from "@mui/material";

type CustomColors =
  | "LogoActive"
  | "ChatBraun"
  | "TreatmentsTextH"
  | "FieryOrange"
  | "PinkMarbleSky"
  | "CreamyDawn"
  | "SteelMist"
  | "PinkChiffon"
  | "Transparent"
  | "GrayPhoneNav"
  | "SoftGray"
  | "CreamBeige"
  | "GrayDisable";

type CustomPalette = Record<CustomColors, SimplePaletteColorOptions>;

declare module "@mui/material/styles/createPalette" {
  interface PaletteOptions extends Partial<CustomPalette> {}
  interface Palette extends CustomPalette {}
}

type AppBarColors = CustomColors;

declare module "@mui/material" {
  interface AppBarPropsColorOverrides extends Record<AppBarColors, never> {}
}

type CustomFonts = "heading" | "paragraph" | "accent" | "secondary";

type CustomTypography = Record<CustomFonts, CSSProperties>;

declare module "@mui/material/styles" {
  interface TypographyVariants extends CustomTypography {}
  interface TypographyVariantsOptions extends Partial<CustomTypography> {}
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides extends Record<CustomFonts, true> {}
}
type CustomButton = "primary" | "primary-outlined" | "accent" | "default";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides extends Record<CustomButton, true> {}
}
