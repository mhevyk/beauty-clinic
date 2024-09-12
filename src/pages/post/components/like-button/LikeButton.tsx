import { useRef, useState } from "react";

import IconButton from "@mui/material/IconButton";

import { useSetLikeMutation } from "@/api/generated";
import useDebouncedValue from "@/hooks/use-debounced-value/useDebouncedValue";
import useUpdateEffect from "@/hooks/use-update-effect/useUpdateEffect";
import {
  LikeButtonContainer,
  LikeIcon,
  LikesCount,
} from "@/pages/post/components/like-button/LikeButton.styles";

type LikeButtonProps = {
  postId: number;
  initialLikesCount: number;
  initialIsLiked: boolean;
};

export default function LikeButton({
  postId,
  initialLikesCount,
  initialIsLiked,
}: LikeButtonProps) {
  const abortControllerRef = useRef<AbortController | null>(null);
  const previousLikeStatusRef = useRef(initialIsLiked);

  const [likeInfo, setLikeInfo] = useState({
    likesCount: initialLikesCount,
    isLiked: initialIsLiked,
  });

  const [saveLike] = useSetLikeMutation();
  const debouncedLikeInfo = useDebouncedValue(likeInfo);

  const handlePostLike = () => {
    const isLiked = likeInfo.isLiked;

    setLikeInfo({
      likesCount: isLiked ? likeInfo.likesCount - 1 : likeInfo.likesCount + 1,
      isLiked: !isLiked,
    });
  };

  useUpdateEffect(() => {
    if (debouncedLikeInfo.isLiked === previousLikeStatusRef.current) {
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();

    const isLiked = debouncedLikeInfo.isLiked;
    previousLikeStatusRef.current = isLiked;

    saveLike({
      variables: { input: { postId, isLiked } },
      context: {
        fetchOptions: {
          signal: abortControllerRef.current.signal,
        },
      },
      onError: () => {
        // TODO: handle like rollback
      },
    });

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [debouncedLikeInfo.isLiked]);

  // TODO: add animation to like icon

  return (
    <LikeButtonContainer>
      {likeInfo.likesCount > 0 && (
        <LikesCount>{likeInfo.likesCount}</LikesCount>
      )}
      <IconButton disableRipple onClick={handlePostLike}>
        <LikeIcon isLiked={likeInfo.isLiked} />
      </IconButton>
    </LikeButtonContainer>
  );
}
