import { useSearchParams } from "react-router-dom";

import { useGetPostsQuery } from "@/api/generated";
import AppHelmet from "@/components/app-helmet/AppHelmet";
import BlogTabLayout from "@/layouts/blog-tab-layout/BlogTabLayout";
import Masonry from "@/layouts/masonry/Masonry";
import { BoxStyled, PostBox } from "@/pages/blog/BlogPage.styled";
import NoResults from "@/pages/blog/components/no-results/NoResults";
import PostCard from "@/pages/blog/components/post-card/PostCard";
import repeatComponent from "@/utils/repeat-component/repeatComponent";
import PostCardSkeleton from "@/pages/blog/components/post-card-skeleton/PostCardSkeleton";

const postSkeletonCount = 4;

export default function BlogPage() {
  const [searchParams] = useSearchParams();
  const { data, loading } = useGetPostsQuery({
    variables: {
      categorySlug: searchParams.get("category"),
      search: searchParams.get("search"),
    },
  });

  /* TODO: Replace with layout */
  return (
    <AppHelmet
      title="Blog"
      description="Blog with posts from experts in our field"
    >
      <BoxStyled>
        <BlogTabLayout />
        <PostBox>
          {loading ? (
            <Masonry
              gap="2rem"
              columnsByBreakpoint={{
                "0": 1,
                "1000px": 2,
              }}
            >
              {repeatComponent(<PostCardSkeleton />, postSkeletonCount)}
            </Masonry>
          ) : data?.posts.length ? (
            <Masonry
              gap="2rem"
              columnsByBreakpoint={{
                "0": 1,
                "1000px": data.posts.length > 1 ? 2 : 1,
              }}
            >
              {data.posts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </Masonry>
          ) : (
            <NoResults />
          )}
        </PostBox>
      </BoxStyled>
    </AppHelmet>
  );
}
