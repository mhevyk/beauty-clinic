import { PaletteColorOptions } from "@mui/material";
import { CSSProperties } from "react";

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
  | "GrayPhoneNav";
type CustomPalette = Record<CustomColors, PaletteColorOptions>;

declare module "@mui/material/styles/createPalette" {
  interface PaletteOptions extends Partial<CustomPalette> {}
  interface Palette extends CustomPalette {}
}

type AppBarColors = CustomColors;

declare module "@mui/material" {
  interface AppBarPropsColorOverrides extends Record<AppBarColors, any> {}
}

type CustomFonts =
  | `FontArialBlack${1 | 2 | 3}`
  | `FontAvenirLight${1 | 2 | 3 | 4}`;
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
