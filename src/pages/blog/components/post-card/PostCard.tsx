import { MouseEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
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
  ShareButtonStyled,
  StatsBox,
  TransparentButton,
} from "@/pages/blog/components/post-card/PostCard.styled";
import LikeWidget from "@/pages/post/components/like-widget/LikeWidget";
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
      image: string;
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

  const [image, { hasError }] = useLazyImage({
    src: post.image,
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
        <BoxImageStyled isLoading={false} shouldShowImagePlaceholder={hasError}>
          <ImgStyled src={image} alt={`'${post?.title}' post image`} />
        </BoxImageStyled>
        <ContentBox>
          <PostInfoBox>
            <Box display="flex" gap={1}>
              <TransparentButton onClick={handleRedirectToUser} role="link">
                <Avatar />
              </TransparentButton>
              <Box>
                <TransparentButton onClick={handleRedirectToUser} role="link">
                  <Typography>{post.author.username}</Typography>
                </TransparentButton>
                <Typography>
                  {format(post.createdAt, "MMM d, yyyy")} &middot;{" "}
                  {post.estimatedReadTime} min read
                </Typography>
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
            <Typography variant="h2" fontSize={26} fontWeight={800}>
              {post.title}
            </Typography>
            <Typography
              component={"p"}
              variant={"paragraph"}
              marginTop={"1rem"}
            >
              {post.summary}
            </Typography>
          </PostContentBox>
          <StatsBox>
            <Box display="flex" alignItems="center" gap={2}>
              {isSmallScreen ? (
                <>
                  <Icon component={EyeIcon} />
                  <Typography fontSize={20}>{post.viewsCount}</Typography>
                  <Icon component={CommentIcon} />
                  <Typography fontSize={20}>{post.commentsCount}</Typography>
                </>
              ) : (
                <>
                  <Typography fontSize={12}>{post.viewsCount} views</Typography>
                  <Typography fontSize={12}>
                    {post.commentsCount} comments
                  </Typography>
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
