import { useState } from "react";

import IconButton from "@mui/material/IconButton";

import {
  LikeButtonContainer,
  LikeIcon,
  LikesCount,
} from "@/pages/post/components/like-button/LikeButton.styles";

type LikeButtonProps = {
  initialLikesCount: number;
  initialIsPostLiked: boolean;
};

export default function LikeButton({
  initialLikesCount,
  initialIsPostLiked,
}: LikeButtonProps) {
  const [isPostLiked, setIsPostLiked] = useState(initialIsPostLiked);
  const [likesCount, setLikesCount] = useState(initialLikesCount);

  const handlePostLike = () => {
    const newLikedStatus = !isPostLiked;
    // TODO: handle backend request
    setIsPostLiked(newLikedStatus);
    setLikesCount(newLikedStatus ? likesCount + 1 : likesCount - 1);
  };

  // TODO: add animation to like icon

  return (
    <LikeButtonContainer>
      {likesCount > 0 && <LikesCount>{likesCount}</LikesCount>}
      <IconButton disableRipple onClick={handlePostLike}>
        <LikeIcon isLiked={isPostLiked} />
      </IconButton>
    </LikeButtonContainer>
  );
}
