import { MouseEvent, useRef, useState } from "react";

import { useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";

import { useSetLikeMutation } from "@/api/generated";
import useDebouncedValue from "@/hooks/use-debounced-value/useDebouncedValue";
import useUpdateEffect from "@/hooks/use-update-effect/useUpdateEffect";
import {
  LikeButtonContainer,
  LikeIcon,
  LikesCount,
} from "@/pages/post/components/like-button/LikeButton.styled";
import { useUserStore } from "@/store/user/userStore";
import theme from "@/theme/theme";
import showSnackbar from "@/utils/show-snackbar/showSnackbar";

type LikeButtonProps = {
  postId: number;
  isLiked: boolean;
  likesCount: number;
};

export default function LikeButton({
  postId,
  isLiked: initialIsLiked,
  likesCount: initialLikesCount,
}: LikeButtonProps) {
  const [likeState, setLikeState] = useState({
    isLiked: initialIsLiked,
    likesCount: initialLikesCount,
  });
  const prevLikeStateRef = useRef(likeState);

  const abortControllerRef = useRef<AbortController | null>(null);
  const isAuthenticated = useUserStore(store => store.checkAuthenticated());

  const { isLiked, likesCount } = likeState;

  const debouncedIsLiked = useDebouncedValue(isLiked);

  const [saveLike] = useSetLikeMutation({
    ignoreResults: true, // skips extra rerender because return value here is not important
    onError: () => {
      showSnackbar({
        message: `Failed to ${prevLikeStateRef.current.isLiked ? "unlike" : "like"} post, please try again later`,
        autohide: true,
      });

      // if error happened - revert back to previous like state
      setLikeState(prevLikeStateRef.current);
    },
  });

  const handlePostLike = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!isAuthenticated) {
      showSnackbar({
        message: "Please sign in to like the post",
        autohide: true,
      });

      return;
    }

    const newIsLiked = !isLiked;

    const newLikeState = {
      isLiked: newIsLiked,
      likesCount: likesCount + (newIsLiked ? 1 : -1),
    };

    setLikeState(newLikeState);
    prevLikeStateRef.current = likeState;
  };

  const handleRequestAbort = () => {
    abortControllerRef.current?.abort();
  };

  useUpdateEffect(() => {
    if (prevLikeStateRef.current.isLiked !== debouncedIsLiked) {
      handleRequestAbort();

      abortControllerRef.current = new AbortController();

      saveLike({
        variables: {
          input: {
            postId,
            isLiked: debouncedIsLiked,
          },
        },
        context: {
          fetchOptions: {
            signal: abortControllerRef.current.signal,
          },
        },
      });
    }
    return handleRequestAbort;
  }, [debouncedIsLiked]);

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <LikeButtonContainer>
      {likesCount > 0 && (
        <LikesCount data-testid="like-count">{likesCount}</LikesCount>
      )}
      <IconButton
        disableRipple
        onClick={handlePostLike}
        data-testid="heart-button"
      >
        <LikeIcon isSmallScreen={isSmallScreen} isLiked={isLiked} />
      </IconButton>
    </LikeButtonContainer>
  );
}
