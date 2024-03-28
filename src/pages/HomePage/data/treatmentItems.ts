import { SxProps } from "@mui/material";
import homeSignatureFacial from "@images/homeSignatureFacial.svg";
import theme from "@theme/theme.ts";
import homeOxygenFacial from "@images/homeOxygenFacial.svg";
import homePurifyingHerbalFacial from "@images/homePurifyingHerbalFacial.svg";

type SvgImg = {
  svgImage: string;
  styled: SxProps;
};

const treatmentSvgImage: SvgImg[] = [
  {
    svgImage: homeSignatureFacial,
    styled: {
      top: "35%",
      right: "32%",
      height: "177px",
      transform: "translate(-50%, -50%) rotate(349deg)",
      [theme.breakpoints.up("sm")]: {
        right: "35%",
      },
      [theme.breakpoints.up("md")]: {
        right: "24%",
      },
      [theme.breakpoints.up("lg")]: {
        top: "35%",
        right: "26%",
      },
    },
  },
  {
    svgImage: homeOxygenFacial,
    styled: {
      top: "28%",
      left: "50%",
      height: "234px",
      transform: "translate(-50%, -50%)",
    },
  },
  {
    svgImage: homePurifyingHerbalFacial,
    styled: {
      top: "25%",
      left: "40%",
      height: "253px",
      transform: "translate(-50%, -50%) rotate(18deg)",
      [theme.breakpoints.up("md")]: {
        top: "20%",
        left: "35%",
      },
      [theme.breakpoints.up("lg")]: {
        top: "25%",
      },
    },
  },
];

export default treatmentSvgImage;
