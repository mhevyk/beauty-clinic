import { IconButton } from "@mui/material";

import {
  LikeButtonContainer,
  LikeIcon,
  SkeletonLikesCount,
} from "@/pages/post/components/like-button/LikeButton.styled";

export default function LikeWidgetSkeleton() {
  return (
    <LikeButtonContainer data-testid="like-skeleton">
      <SkeletonLikesCount />
      <IconButton disableRipple>
        <LikeIcon isDisabled />
      </IconButton>
    </LikeButtonContainer>
  );
}
