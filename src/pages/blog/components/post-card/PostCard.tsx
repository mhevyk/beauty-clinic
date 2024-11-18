import { Link } from "react-router-dom";

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

// temporary post for ui
const post: Post = {
  id: 1,
  author: {
    id: 1,
    username: "Admin",
    role: "ADMIN",
  },
  createdAt: "2024-11-14T07:35:34.842Z",
  updatedAt: "2024-11-14T07:35:34.842Z",
  estimatedReadTime: 1,
  image:
    "https://static.wixstatic.com/media/84770f_170242c7269d4ba2ba8ad50591e1a1e8~mv2_d_4500_2992_s_4_2.jpg/v1/fill/w_925,h_615,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/84770f_170242c7269d4ba2ba8ad50591e1a1e8~mv2_d_4500_2992_s_4_2.jpg",
  title: "Why are Facials a Must for the Modern Woman",
  summary:
    "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your audience to continue reading...",
  viewsCount: 0,
  commentsCount: 0,
};
// let post: Post = undefined;

export default function PostCard() {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  if (post === undefined) {
    return <PostCardSkeleton />;
  }

  const [image, { hasError }] = useLazyImage({
    src: post.image,
    placeholderSrc: imagePlaceholder,
  });

  return (
    <BoxStyled>
      <Link to={`${routePaths.posts.path}/${post.id}`}>
        <BoxImageStyled isLoading={false} shouldShowImagePlaceholder={hasError}>
          <ImgStyled src={image} alt={`'${post?.title}' post image`} />
        </BoxImageStyled>
        <ContentBox>
          <PostInfoBox>
            <Box display="flex" gap={1}>
              <Link to={`/members/${post.author.id}`}>
                <Avatar />
              </Link>
              <Box>
                <Link to={`/members/${post.author.id}`}>
                  <Typography>{post.author.username}</Typography>
                </Link>
                <Typography>
                  {format(post.createdAt, "MMM d, yyyy")} &middot;{" "}
                  {post.estimatedReadTime} min read
                </Typography>
              </Box>
            </Box>
            <ShareButtonStyled disableRipple area-label="share">
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
