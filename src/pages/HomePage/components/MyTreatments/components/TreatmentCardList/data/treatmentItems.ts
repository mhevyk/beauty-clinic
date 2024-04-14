import { SxProps } from "@mui/material";
import theme from "@theme/theme.ts";
import seaweedDecorationDecoration from "@decorations/seaweed.svg";
import grassBladeDecoration from "@decorations/grass-blade.svg";
import tulipDecoration from "@decorations/tulip.svg";

type MyTreatmentDecorationImageType = {
  svgImage: string;
  styled: SxProps;
};

const myTreatmentDecorationImageData: MyTreatmentDecorationImageType[] = [
  {
    svgImage: seaweedDecorationDecoration,
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
    svgImage: grassBladeDecoration,
    styled: {
      top: "28%",
      left: "50%",
      height: "234px",
      transform: "translate(-50%, -50%)",
    },
  },
  {
    svgImage: tulipDecoration,
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

export default myTreatmentDecorationImageData;
