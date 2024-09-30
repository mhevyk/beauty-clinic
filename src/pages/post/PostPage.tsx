import { Navigate, useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import DOMPurify from "dompurify";

import { useGetPostByIdQuery } from "@/api/generated";
import AppHelmet from "@/components/app-helmet/AppHelmet";
import BlogTabLayout from "@/layouts/blog-tab-layout/BlogTabLayout";
import PageWrapper from "@/layouts/page-wrapper/PageWrapper";
import { BlogHeader, PostWrapper, Title } from "@/pages/post/PostPage.styled";
import PostFooter from "@/pages/post/components/post-footer/PostFooter";
import PostHeader from "@/pages/post/components/post-header/PostHeader";
import theme from "@/theme/theme";

// TODO: complete with real UI
export default function PostPage() {
  const params = useParams();

  const { data, loading } = useGetPostByIdQuery({
    variables: { postId: Number(params.postId) },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  const post = data?.post;

  if (!post) {
    return <Navigate to="/not-found" />;
  }

  const sanitizedContent = DOMPurify.sanitize(post.content);

  return (
    <AppHelmet title={post.title}>
      <PageWrapper wrapperBackgroundColor={theme.palette.PinkMarbleSky.main}>
        <BlogHeader>
          <BlogTabLayout />
        </BlogHeader>
        <PostWrapper>
          <PostHeader
            author={post.author}
            createdAt={post.createdAt}
            estimatedReadTime={post.estimatedReadTime}
          />
          <Title>{post.title}</Title>
          <Box dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
          <PostFooter
            categories={post.categories}
            commentsCount={post.commentsCount}
            viewsCount={post.viewsCount}
          />
        </PostWrapper>
      </PageWrapper>
    </AppHelmet>
  );
}
