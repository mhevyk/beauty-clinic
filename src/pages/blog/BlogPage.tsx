import { useSearchParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import BlogTabLayout from "@/layouts/blog-tab-layout/BlogTabLayout";

export default function BlogPage() {
  const [searchParams] = useSearchParams();

  /* TODO: Replace with layout */
  return (
    <Box sx={{ marginTop: "100px" }}>
      <BlogTabLayout>
        <Typography>Hello {searchParams.get("category")}</Typography>
      </BlogTabLayout>
    </Box>
  );
}
