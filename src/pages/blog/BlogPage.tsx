import { useSearchParams } from "react-router-dom";

import { useGetPostsQuery } from "@/api/generated";
import AppHelmet from "@/components/app-helmet/AppHelmet";
import BlogTabLayout from "@/layouts/blog-tab-layout/BlogTabLayout";
import Masonry from "@/layouts/masonry/Masonry";
import { BoxStyled, PostBox } from "@/pages/blog/BlogPage.styled";
import NoResults from "@/pages/blog/components/no-results/NoResults";
import PostCardSkeleton from "@/pages/blog/components/post-card-skeleton/PostCardSkeleton";
import PostCard from "@/pages/blog/components/post-card/PostCard";
import repeatComponent from "@/utils/repeat-component/repeatComponent";
import AppButton from "@/styles/app-button/AppButton";

const postSkeletonCount = 4;

export default function BlogPage() {
  const [searchParams] = useSearchParams();
  const { data, loading, error } = useGetPostsQuery({
    variables: {
      categorySlug: searchParams.get("category"),
      search: searchParams.get("search"),
    },
  });

  const postCardMasonryColumns = data && data.posts.length > 1 ? 2 : 1
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
      <BoxStyled>
        <BlogTabLayout />
        <PostBox>
          <Masonry
            gap="2rem"
            columnsByBreakpoint={{
              "0": 1,
              "1000px": postCardMasonryColumns,
            }}
          >
            <AppButton variant="secondary">Click</AppButton>
            {isLoadingPosts}
          </Masonry>
          {isNoPostsFound && <NoResults />}
        </PostBox>
      </BoxStyled>
    </AppHelmet>
  );
}
