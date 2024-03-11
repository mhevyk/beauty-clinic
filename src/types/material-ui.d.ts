import { PaletteColorOptions } from "@mui/material";
import { CSSProperties } from "react";

type CustomColors =
  | "ButtonBlack"
  | "ButtonOutlined"
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

type ButtonColors = Extract<
  CustomColors,
  "ButtonBlack" | "ButtonOutlined" | "FieryOrange"
>;

type AppBarColors = Exclude<CustomColors, ButtonColors>;

declare module "@mui/material" {
  interface ButtonPropsColorOverrides extends Record<ButtonColors, any> {}
  interface AppBarPropsColorOverrides extends Record<AppBarColors, any> {}
}

type CustomFonts =
  | `FontArialBlack${1 | 2 | 3}`
  | `FontAvenirLight${1 | 2 | 3 | 4}`;
type CustomTypography = Record<CustomFonts, CSSProperties>;

type CustomBreakpoints = "xxl";

declare module "@mui/material/styles" {
  interface TypographyVariants extends CustomTypography {}
  interface TypographyVariantsOptions extends Partial<CustomTypography> {}
  interface BreakpointOverrides extends Record<CustomBreakpoints, true> {}
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides extends Record<CustomFonts, true> {}
}
type CustomButton =
  | "blackFat"
  | "black"
  | "submit"
  | "outline2"
  | "time"
  | "login";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides extends Record<CustomButton, true> {}
}
