import { PropsWithChildren } from "react";

import Box from "@mui/material/Box";

import BlogTabs from "@/layouts/blog-tab-layout/components/blog-tabs/BlogTabs";

type BlogTabLayoutProps = PropsWithChildren;

export default function BlogTabLayout({ children }: BlogTabLayoutProps) {
  return (
    <Box>
      <BlogTabs />
      {children}
    </Box>
  );
}
