import { MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import useMediaQuery from "@mui/material/useMediaQuery";
import { format } from "date-fns";

import CommentIcon from "@/assets/icons/comment.svg";
import EyeIcon from "@/assets/icons/eye.svg";
import imagePlaceholder from "@/assets/icons/image-placeholder.svg?url";
import ShareIcon from "@/assets/icons/three-dots-vertical.svg";

import { routePaths } from "@/constants/routePaths";
import useLazyImage from "@/hooks/use-lazy-mage/useLazyImage";
import PostCardSkeleton from "@/pages/blog/components/post-card-skeleton/PostCardSkeleton";
import {
  BoxImageStyled,
  BoxStyled,
  ContentBox,
  ImgStyled,
  PostContentBox,
  PostInfoBox,
  PostTitle,
  ShareButtonStyled,
  StatsBox,
  TransparentButton,
} from "@/pages/blog/components/post-card/PostCard.styled";
import LikeWidget from "@/pages/post/components/like-widget/LikeWidget";
import AppTypography from "@/styles/app-typography/AppTypography";
import theme from "@/theme/theme";

type Post =
  | {
      id: number;
      author: {
        id: number;
        username: string;
        role: string;
      };
      createdAt: string;
      updatedAt: string;
      estimatedReadTime: number;
      image?: string | null;
      title: string;
      summary: string;
      viewsCount: number;
      commentsCount: number;
    }
  | undefined;

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  if (post === undefined) {
    return <PostCardSkeleton />;
  }

  const [image, { hasError, isLoading }] = useLazyImage({
    src: post.image!,
    placeholderSrc: imagePlaceholder,
  });

  function handleSharePost(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    // TODO: add share functionality
  }

  function handleRedirectToUser(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (post) {
      navigate(`/members/${post.author.id}`);
    }
  }

  return (
    <BoxStyled>
      <Link to={`${routePaths.posts.path}/${post.id}`}>
        <BoxImageStyled
          isLoading={false}
          shouldShowImagePlaceholder={hasError || isLoading}
        >
          <ImgStyled src={image} alt={`'${post?.title}' post image`} />
        </BoxImageStyled>
        <ContentBox>
          <PostInfoBox>
            <Box display="flex" gap={2}>
              <TransparentButton onClick={handleRedirectToUser} role="link">
                <Avatar />
              </TransparentButton>
              <Box>
                <TransparentButton onClick={handleRedirectToUser} role="link">
                  <AppTypography>{post.author.username}</AppTypography>
                </TransparentButton>
                <AppTypography>
                  {format(post.createdAt, "MMM d, yyyy")} &middot;{" "}
                  {post.estimatedReadTime} min read
                </AppTypography>
              </Box>
            </Box>
            <ShareButtonStyled
              onClick={handleSharePost}
              disableRipple
              area-label="share"
            >
              <ShareIcon />
            </ShareButtonStyled>
          </PostInfoBox>
          <PostContentBox>
            <PostTitle variant="h2">{post.title}</PostTitle>
            <AppTypography>{post.summary}</AppTypography>
          </PostContentBox>
          <StatsBox>
            <Box display="flex" alignItems="center" gap={2}>
              {isSmallScreen ? (
                <>
                  <Icon component={EyeIcon} />
                  <AppTypography variant="accent">
                    {post.viewsCount}
                  </AppTypography>
                  <Icon component={CommentIcon} />
                  <AppTypography variant="Accent">
                    {post.commentsCount}
                  </AppTypography>
                </>
              ) : (
                <>
                  <AppTypography fontSize={12}>
                    {post.viewsCount} views
                  </AppTypography>
                  <AppTypography fontSize={12}>
                    {post.commentsCount} comments
                  </AppTypography>
                </>
              )}
            </Box>
            <LikeWidget postId={post.id} />
          </StatsBox>
        </ContentBox>
      </Link>
    </BoxStyled>
  );
}
