import { Link } from "react-router-dom";

import Box from "@mui/material/Box";

import { PostCategory } from "@/api/generated";

type BlogTabProps = {
  categoryLabel: PostCategory["name"];
  categorySlug?: PostCategory["slug"];
};

export default function BlogTab({ categoryLabel, categorySlug }: BlogTabProps) {
  const to = categorySlug ? `/posts?category=${categorySlug}` : "/posts";

  return (
    <Box component="li">
      <Link to={to}>{categoryLabel}</Link>
    </Box>
  );
}
