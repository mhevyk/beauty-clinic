import { useSearchParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import AppHelmet from "@/components/app-helmet/AppHelmet";
import BlogTabLayout from "@/layouts/blog-tab-layout/BlogTabLayout";
import Masonry from "@/layouts/masonry/Masonry";
import { BoxStyled } from "@/pages/blog/BlogPage.styled";
import PostCard from "@/pages/blog/components/post-card/PostCard";

// Temporary data
const posts = [
  {
    id: 23565,
    author: {
      id: 1,
      username: "Admin",
      role: "ADMIN",
    },
    createdAt: "2024-11-16T07:11:14.724Z",
    updatedAt: "2024-11-16T07:11:14.724Z",
    estimatedReadTime: 2,
    image:
      "https://static.wixstatic.com/media/84770f_7ea6a0f695394f43a695366a07b4dc8a~mv2_d_3388_4150_s_4_2.jpg/v1/fill/w_925,h_1133,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/84770f_7ea6a0f695394f43a695366a07b4dc8a~mv2_d_3388_4150_s_4_2.jpg",
    title: "Breaking Skin Care Myths",
    summary:
      "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your audience to continue reading...",
    viewsCount: 0,
    commentsCount: 0,
  },
  {
    id: 537486,
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
  },
  undefined,
  {
    id: 667095,
    author: {
      id: 1,
      username: "Admin",
      role: "ADMIN",
    },
    createdAt: "2024-11-16T07:11:14.724Z",
    updatedAt: "2024-11-16T07:11:14.724Z",
    estimatedReadTime: 2,
    image:
      "https://static.wixstatic.com/media/84770f_7ea6a0f695394f43a695366a07b4dc8a~mv2_d_3388_4150_s_4_2.jpg/v1/fill/w_925,h_1133,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/84770f_7ea6a0f695394f43a695366a07b4dc8a~mv2_d_3388_4150_s_4_2.jpg",
    title: "Breaking Skin Care Myths",
    summary:
      "Create a blog post subtitle that summarizes your post in a few short, punchy sentences and entices your audience to continue reading...",
    viewsCount: 0,
    commentsCount: 0,
  },
];

export default function BlogPage() {
  const [searchParams] = useSearchParams();

  /* TODO: Replace with layout */
  return (
    <AppHelmet
      title="Blog"
      description="Blog with posts from experts in our field"
    >
      <BoxStyled>
        <BlogTabLayout>
          <Typography>Hello {searchParams.get("category")}</Typography>
        </BlogTabLayout>
        <Box display="flex" justifyContent="center">
          <Masonry
            gap="2rem"
            columnsByBreakpoint={{
              "0": 1,
              "1000px": 2,
            }}
          >
            {posts.map(post => (
              <PostCard key={Math.random()} post={post} />
            ))}
          </Masonry>
        </Box>
      </BoxStyled>
    </AppHelmet>
  );
}
