import { Suspense } from "react";

import ErrorBoundary from "@/components/error-boundary/ErrorBoundary";
import BlogCategories from "@/layouts/blog-tab-layout/components/blog-categories/BlogCategories";
import BlogSearch from "@/layouts/blog-tab-layout/components/blog-search/BlogSearch";
import BlogTab from "@/layouts/blog-tab-layout/components/blog-tab/BlogTab";
import {
  BlogTabsStack,
  BlogTabsToolbar,
  CategorySkeleton,
} from "@/layouts/blog-tab-layout/components/blog-tabs/BlogTabs.styles";

export default function BlogTabs() {
  return (
    <BlogTabsToolbar>
      <BlogTabsStack component="ul">
        <BlogTab categoryLabel="All posts" />
        <ErrorBoundary>
          <Suspense
            fallback={
              <>
                <CategorySkeleton data-testid="skeleton" />
                <CategorySkeleton data-testid="skeleton" />
                <CategorySkeleton data-testid="skeleton" />
              </>
            }
          >
            <BlogCategories />
          </Suspense>
        </ErrorBoundary>
      </BlogTabsStack>
      <BlogSearch />
    </BlogTabsToolbar>
  );
}
