import { styled } from "@mui/material";

export const List = styled("dl")({
  margin: 0,
});

export const DefinitionItemLabel = styled("dt")({
  display: "inline-block",
  marginRight: "6px",
  fontSize: 16,
  "&::after": {
    content: '":"',
  },
});

export const DefinitionItemValue = styled("dd")({
  fontSize: 16,
  display: "inline-block",
  margin: 0,
  lineHeight: "2rem",
});
