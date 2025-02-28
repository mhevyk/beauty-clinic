import { Navigate, useParams } from "react-router-dom";

import { useGetPostByIdQuery } from "@/api/generated";
import AppHelmet from "@/components/app-helmet/AppHelmet";
import BlogTabLayout from "@/layouts/blog-tab-layout/BlogTabLayout";
import PageWrapper from "@/layouts/page-wrapper/PageWrapper";
import "@/pages/post/PostPage.scss";
import PostFooter from "@/pages/post/components/post-footer/PostFooter";
import PostHeader from "@/pages/post/components/post-header/PostHeader";
import AppEditorContent from "@/styles/app-editor/app-editor-content";
import AppTypography from "@/styles/app-typography/AppTypography";
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

  return (
    <AppHelmet title={post.title} description={post.summary}>
      <PageWrapper wrapperBackgroundColor={theme.palette.PinkMarbleSky.main}>
        <div className="post__header">
          <BlogTabLayout />
        </div>
        <div className="post__content">
          <PostHeader
            author={post.author}
            createdAt={post.createdAt}
            estimatedReadTime={post.estimatedReadTime}
          />
          <AppTypography className="post__title" variant="h3" as="h1">
            {post.title}
          </AppTypography>
          <AppEditorContent value={post.content} />
          <PostFooter
            categories={post.categories}
            commentsCount={post.commentsCount}
            viewsCount={post.viewsCount}
          />
        </div>
      </PageWrapper>
    </AppHelmet>
  );
}
