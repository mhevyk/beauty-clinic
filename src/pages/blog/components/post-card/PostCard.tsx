import { Link } from "react-router-dom";

import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { format } from "date-fns";

import ShareIcon from "@/assets/icons/three-dots-vertical.svg";

import { routePaths } from "@/constants/routePaths";
import {
  BoxStyled,
  ContentBox,
  ImgStyled,
  PostContentBox,
  PostInfoBox,
  StatsBox,
} from "@/pages/blog/components/post-card/PostCard.styled";
import LikeWidget from "@/pages/post/components/like-widget/LikeWidget";

// temporary post for ui
const post = {
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

export default function PostCard() {
  return (
    <Link to={`${routePaths.posts.path}/${post.id}`}>
      <BoxStyled>
        <ImgStyled src={post.image} alt={`'${post.title}' post image`} />
        <ContentBox>
          <PostInfoBox>
            <Box display="flex" gap={1}>
              <Avatar />
              <Box>
                <Typography>{post.author.username}</Typography>
                <Typography>
                  {format(post.createdAt, "MMM d, yyyy")} &middot;{" "}
                  {post.estimatedReadTime} min read
                </Typography>
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
            <Typography variant="h2" fontSize={26} fontWeight={800}>
              {post.title}
            </Typography>
            <Typography component={"p"} variant={"paragraph"} marginTop={"1rem"}>
              {post.summary}
            </Typography>
          </PostContentBox>
          <StatsBox>
            <Box display="flex" alignItems="center" gap={2}>
              <Typography fontSize={12}>{post.viewsCount} views</Typography>
              <Typography fontSize={12}>
                {post.commentsCount} comments
              </Typography>
            </Box>
            <LikeWidget postId={post.id} />
          </StatsBox>
        </ContentBox>
      </BoxStyled>
    </Link>
  );
}
