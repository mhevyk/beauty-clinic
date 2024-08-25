import { Box, Typography } from "@mui/material";

import PostForm from "@/containers/forms/post-form/PostForm";
import { PostFormValues } from "@/containers/forms/post-form/PostForm.types";
import useCurrentUser from "@/hooks/use-current-user/useCurrentUser";
import { useCreatePostMutation } from "@/api/generated";

export default function CreatePostPage() {
  const [createPost] = useCreatePostMutation();
  const user = useCurrentUser();

  const handleSubmit = async (values: PostFormValues) => {
    await createPost({
      variables: {
        input: {
          title: values.title,
          content: values.content,
          categoryIds: values.categoryIds,
          authorId: user!.id,
        },
      },
    });
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
      <PostForm handleSubmit={handleSubmit} />
    </Box>
  );
}
