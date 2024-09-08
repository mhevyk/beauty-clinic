import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import HeartIcon from "@/assets/icons/heart.svg";

import theme from "@/theme/theme";

type LikeIconProps = {
  isLiked: boolean;
};

export const LikeIcon = styled(HeartIcon)<LikeIconProps>(props => ({
  fill: props.isLiked ? theme.palette.error.light : "none",
  stroke: theme.palette.error.light,
}));

export const LikeButtonContainer = styled(Box)({
  position: "relative",
});

export const LikesCount = styled(Typography)({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  left: "-5px",
  fontSize: "14px",
});
