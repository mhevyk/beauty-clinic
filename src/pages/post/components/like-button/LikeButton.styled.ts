import { CSSProperties } from "react";

import { keyframes, styled } from "@mui/material";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

import HeartIcon from "@/assets/icons/heart.svg";

import theme from "@/theme/theme";

const likeAnimation = keyframes`
  0% {
    transform: scale(.1);
  }

  40% {
    transform: scale(1.3);
  }

  70% {
    transform: scale(.9);
  }

  90% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
`;

export const likeCircleAnimation = keyframes`
  0% {
    opapity: .1;
    transform: scale(.1)
  }

  20% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: scale(1.5);
  }
`;

type LikeIconProps = {
  isLiked?: boolean;
  isDisabled?: boolean;
};

export const LikeIcon = styled(HeartIcon, {
  shouldForwardProp: prop => prop !== "isLiked" && prop !== "isDisabled",
})<LikeIconProps>(props => {
  let fillColor = "none";
  let strokeColor = theme.palette.error.light;

  if (props.isLiked) {
    fillColor = theme.palette.error.light;
  } else if (props.isDisabled) {
    fillColor = theme.palette.grey[300];
    strokeColor = theme.palette.grey[300];
  }

  return {
    transition: "fill .25s",
    fill: fillColor,
    stroke: strokeColor,
    ...(props.isLiked && {
      animation: `${likeAnimation} .5s;`,
    }),
  };
});

export const LikeButtonContainer = styled(Box)({
  position: "relative",
});

const likesCountBaseStyles: CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
};

export const LikesCount = styled(Typography)({
  ...likesCountBaseStyles,
  left: "-7px",
  fontSize: "14px",
});

export const SkeletonLikesCount = styled(Skeleton)({
  ...likesCountBaseStyles,
  left: "-13px",
  width: "16px",
  height: "9px",
});
