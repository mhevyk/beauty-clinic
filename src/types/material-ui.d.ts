import { PaletteColor, PaletteColorOptions } from "@mui/material";
declare module "@mui/material/styles/createPalette" {
  interface PaletteOptions {
    ButtonBlack?: PaletteColorOptions;
    ButtonReverse?: PaletteColorOptions;
    LogoActive?: PaletteColorOptions;
    ChatBraun?: PaletteColorOptions;
    TreatmentsTextH?: PaletteColorOptions;

    FieryOrange?: PaletteColorOptions;
    PinkMarbleSky?: PaletteColorOptions;
    CreamyDawn?: PaletteColorOptions;
    SteelMist?: PaletteColorOptions;
    PinkChiffon?: PaletteColorOptions;
  }
  interface Palette {
    ButtonBlack: PaletteColor;
    ButtonReverse: PaletteColor;
    LogoActive: PaletteColor;
    ChatBraun: PaletteColor;
    TreatmentsTextH: PaletteColor;

    FieryOrange: PaletteColor;
    PinkMarbleSky: PaletteColor;
    CreamyDawn: PaletteColor;
    SteelMist: PaletteColor;
    PinkChiffon: PaletteColor;
  }
}

declare module "@mui/material" {
  interface ButtonPropsColorOverrides {
    ButtonBlack;
    ButtonReverse;
    FieryOrange;
  }
}

declare module "@mui/material/styles" {
  interface TypographyVariants {
    FontArialBlack1: React.CSSProperties;
    FontArialBlack2: React.CSSProperties;
    FontAvenirLight1: React.CSSProperties;
    FontAvenirLight2: React.CSSProperties;
    FontAvenirLight3: React.CSSProperties;
    FontAvenirLight4: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    FontArialBlack1?: React.CSSProperties;
    FontArialBlack2?: React.CSSProperties;
    FontAvenirLight1?: React.CSSProperties;
    FontAvenirLight2?: React.CSSProperties;
    FontAvenirLight3?: React.CSSProperties;
    FontAvenirLight4?: React.CSSProperties;
  }
}
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    FontArialBlack1: true;
    FontArialBlack2: true;
    FontAvenirLight1: true;
    FontAvenirLight2: true;
    FontAvenirLight3: true;
    FontAvenirLight4: true;

    h1: false;
    h3: false;
  }
}
