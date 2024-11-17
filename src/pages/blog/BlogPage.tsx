import { useSearchParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import AppHelmet from "@/components/app-helmet/AppHelmet";
import BlogTabLayout from "@/layouts/blog-tab-layout/BlogTabLayout";
import PostCard from "@/pages/blog/components/post-card/PostCard";

export default function BlogPage() {
  const [searchParams] = useSearchParams();

  /* TODO: Replace with layout */
  return (
    <AppHelmet
      title="Blog"
      description="Blog with posts from experts in our field"
    >
      <Box sx={{ marginTop: "100px", backgroundColor: "#F8EBE1" }}>
        <BlogTabLayout>
          <Typography>Hello {searchParams.get("category")}</Typography>
        </BlogTabLayout>
        <PostCard />
      </Box>
    </AppHelmet>
  );
}
