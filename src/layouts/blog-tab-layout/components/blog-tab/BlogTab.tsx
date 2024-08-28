import Box from "@mui/material/Box";

import { PostCategory } from "@/api/generated";
import useSearchParamsActions from "@/hooks/use-search-params-actions/useSearchParamsActions";
import { BlogTabButton } from "@/layouts/blog-tab-layout/components/blog-tab/BlogTab.styles";

type BlogTabProps = {
  categoryLabel: PostCategory["name"];
  categorySlug?: PostCategory["slug"];
};

export default function BlogTab({ categoryLabel, categorySlug }: BlogTabProps) {
  const { setSearchParam, deleteSearchParam } = useSearchParamsActions();

  const handleClick = () => {
    if (categorySlug) {
      setSearchParam("category", categorySlug);
    } else {
      deleteSearchParam("category");
    }
  };

  return (
    <Box component="li">
      <BlogTabButton disableRipple disableTouchRipple onClick={handleClick}>
        {categoryLabel}
      </BlogTabButton>
    </Box>
  );
}
