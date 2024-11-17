import { Skeleton } from "@mui/material";
import { Box, IconButton } from "@mui/material";

import imagePlaceholder from "@/assets/icons/image-placeholder.svg?url";
import ShareIcon from "@/assets/icons/three-dots-vertical.svg";

import {
  BoxImageStyled,
  BoxStyled,
  ContentBox,
  ImgStyled,
  PostContentBox,
  PostInfoBox,
  StatsBox,
} from "@/pages/blog/components/post-card/PostCard.styled";
import LikeWidgetSkeleton from "@/pages/post/components/like-widget/LikeWidgetSkeleton";

export default function PostCardSkeleton() {
  return (
    <BoxStyled>
      <BoxImageStyled isLoading={true} shouldShowImagePlaceholder={true}>
        <ImgStyled src={imagePlaceholder} alt="Post image placeholder" />
      </BoxImageStyled>
      <ContentBox>
        <PostInfoBox>
          <Box display="flex" gap={1}>
            <Skeleton variant="circular" width={40} height={40} />
            <Box>
              <Skeleton width={100} />
              <Skeleton width={250} />
            </Box>
          </Box>
          <IconButton
            disableRipple
            sx={{
              "&:hover": { backgroundColor: "transparent" },
              "&:active": { backgroundColor: "transparent" },
            }}
            area-label="share"
          >
            <ShareIcon />
          </IconButton>
        </PostInfoBox>
        <PostContentBox>
          <Skeleton width="100%" height={100} />
          <Skeleton width="100%" height={150} />
        </PostContentBox>
        <StatsBox>
          <Box display="flex" alignItems="center" gap={2}>
            <Skeleton width={50} />
            <Skeleton width={50} />
          </Box>
          <LikeWidgetSkeleton />
        </StatsBox>
      </ContentBox>
    </BoxStyled>
  );
}
