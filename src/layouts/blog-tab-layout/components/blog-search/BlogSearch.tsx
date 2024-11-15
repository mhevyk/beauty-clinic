import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import useToggle from "@/hooks/use-toggle/useToggle";
import BlogSearchInput from "@/layouts/blog-tab-layout/components/blog-search-input/BlogSearchInput";
import { SearchIconStyled } from "@/layouts/blog-tab-layout/components/blog-search/BlogSearch.styled";

export default function BlogSearch() {
  const { isOpen, open, close } = useToggle();

  return (
    <Box>
      {isOpen ? (
        <BlogSearchInput exitSearchMode={close} />
      ) : (
        <IconButton onClick={open} data-testid="open-search-mode">
          <SearchIconStyled />
        </IconButton>
      )}
    </Box>
  );
}
