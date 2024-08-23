import { useParams } from "react-router-dom";

import Box from "@mui/material/Box";

import { PostPageParams } from "@/types/helpers";

// TODO: complete with real UI
export default function PostPage() {
  // TODO: use param to fetch post from backend
  const params = useParams<PostPageParams>();

  return <Box>{params.postId}</Box>;
}
