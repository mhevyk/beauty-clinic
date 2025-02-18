import { useSearchParams } from "react-router-dom";

import SharpLeafSvg from "@/assets/decorations/sharp-leaf.svg";

import { useGetPostsQuery } from "@/api/generated";
import AppHelmet from "@/components/app-helmet/AppHelmet";
import BlogTabLayout from "@/layouts/blog-tab-layout/BlogTabLayout";
import Masonry from "@/layouts/masonry/Masonry";
import "@/pages/blog/BlogPage.scss";
import NoResults from "@/pages/blog/components/no-results/NoResults";
import PostCardSkeleton from "@/pages/blog/components/post-card-skeleton/PostCardSkeleton";
import PostCard from "@/pages/blog/components/post-card/PostCard";
import AppTypography from "@/styles/app-typography/AppTypography.tsx";
import repeatComponent from "@/utils/repeat-component/repeatComponent";

const postSkeletonCount = 4;

export default function BlogPage() {
  const [searchParams] = useSearchParams();
  const { data, loading, error } = useGetPostsQuery({
    variables: {
      categorySlug: searchParams.get("category"),
      search: searchParams.get("search"),
    },
  });

  const postCardMasonryColumns = data && data.posts.length > 1 ? 2 : 1;
  const isNoPostsFound = (!loading && !data?.posts.length) || error;
  const isLoadingPosts = loading
    ? repeatComponent(<PostCardSkeleton />, postSkeletonCount)
    : data && data.posts.map(post => <PostCard key={post.id} post={post} />);

  /* TODO: Replace with layout */
  return (
    <AppHelmet
      title="Blog"
      description="Blog with posts from experts in our field"
    >
      <div className="blog-page">
        <div className="blog-page__header">
          <SharpLeafSvg width={443} className="blog-page__header-icon" />
          <AppTypography variant="h2">Your Ultimate Natural</AppTypography>
          <AppTypography className="blog-page__header-title" variant="h2">
            Skin Care Guide
          </AppTypography>
          <BlogTabLayout />
        </div>
        <div className="blog-page__posts">
          <Masonry
            gap="2rem"
            columnsByBreakpoint={{
              "0": 1,
              "1000px": postCardMasonryColumns,
            }}
          >
            {isLoadingPosts}
          </Masonry>
          {isNoPostsFound && <NoResults />}
        </div>
      </div>
    </AppHelmet>
  );
}
