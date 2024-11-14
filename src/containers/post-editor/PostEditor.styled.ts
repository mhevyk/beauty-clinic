import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

type EditorWrapperProps = {
  isEditorLoading: boolean;
};

export const EditorWrapper = styled(Box, {
  shouldForwardProp: prop => prop !== "isEditorLoading",
})<EditorWrapperProps>(props => ({
  visibility: props.isEditorLoading ? "visible" : undefined,
}));

export const EditorSkeleton = styled(Skeleton)({
  height: 450,
  transform: "none",
});
