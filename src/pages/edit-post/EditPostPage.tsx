import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import AppHelmet from "@/components/app-helmet/AppHelmet";
import PostForm from "@/containers/forms/post-form/PostForm";
import { PostFormValues } from "@/containers/forms/post-form/PostForm.types";
import { PostPageParams } from "@/types/helpers";

export default function EditPostPage() {
  const params = useParams<PostPageParams>();

  const handleSubmit = async (values: PostFormValues) => {
    console.log(values, params.postId);
    // TODO: Implement submit logic
  };

  return (
    // TODO: create reusable wrapper for all pages
    <AppHelmet title="Edit post">
      <Box
        sx={{
          padding: "100px 15px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <Typography variant="heading">Edit Post</Typography>
        <PostForm
          handleSubmit={handleSubmit}
          // TODO: get initial values from server
          initialValues={{
            title: "Edit title",
            content: "Edit content",
          }}
        />
      </Box>
    </AppHelmet>
  );
}
