import { styled } from "@mui/material";
import Box from "@mui/material/Box";

import theme from "@/theme/theme";

export const BlogHeader = styled(Box)({
  marginBottom: "60px",
});

export const PostWrapper = styled(Box)({
  padding: "20px 100px 60px",
  border: `1px solid ${theme.palette.grey[300]}`,
});

export const Title = styled("h2")({
  ...theme.typography.heading,
  fontSize: "28px",
});
