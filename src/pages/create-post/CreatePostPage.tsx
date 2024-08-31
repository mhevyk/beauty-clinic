import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useCreatePostMutation } from "@/api/generated";
import PostForm from "@/containers/forms/post-form/PostForm";
import { PostFormValues } from "@/containers/forms/post-form/PostForm.types";
import useCurrentUser from "@/hooks/use-current-user/useCurrentUser";

export default function CreatePostPage() {
  const [createPost, { loading }] = useCreatePostMutation();
  const user = useCurrentUser();
  const navigate = useNavigate();

  const handleSubmit = async (values: PostFormValues) => {
    const { data } = await createPost({
      variables: {
        input: {
          title: values.title,
          content: values.content,
          categoryIds: values.categoryIds,
          authorId: user!.userId,
          wordsCount: values.wordsCount,
        },
      },
    });

    const id = data?.createPost;
    const redirectUrl = id ? `/posts/${id}` : "/posts";

    navigate(redirectUrl);
  };

  return (
    // TODO: create reusable wrapper for all pages
    <Box
      sx={{
        padding: "100px 15px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <Typography variant="heading">Create Post</Typography>
      <PostForm isFormSubmitting={loading} handleSubmit={handleSubmit} />
    </Box>
  );
}
