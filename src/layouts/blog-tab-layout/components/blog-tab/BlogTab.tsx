import { Link, useSearchParams } from "react-router-dom";

import Box from "@mui/material/Box";

import { PostCategory } from "@/api/generated";

type BlogTabProps = {
  categoryLabel: PostCategory["name"];
  categorySlug?: PostCategory["slug"];
};

export default function BlogTab({ categoryLabel, categorySlug }: BlogTabProps) {
  const [searchParams] = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);

  if (categorySlug) {
    newSearchParams.set("category", categorySlug);
  } else {
    newSearchParams.delete("category");
  }

  const to = `/posts?${newSearchParams.toString()}`;

  return (
    <Box component="li">
      <Link to={to}>{categoryLabel}</Link>
    </Box>
  );
}
