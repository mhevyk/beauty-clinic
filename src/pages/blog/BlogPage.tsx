import { useSearchParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import AppHelmet from "@/components/app-helmet/AppHelmet";
import BlogTabLayout from "@/layouts/blog-tab-layout/BlogTabLayout";
import Masonry from "@/layouts/masonry/Masonry";
import { BoxStyled } from "@/pages/blog/BlogPage.styled";
import PostCard from "@/pages/blog/components/post-card/PostCard";

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
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
          </Masonry>
        </Box>
      </BoxStyled>
    </AppHelmet>
  );
}
