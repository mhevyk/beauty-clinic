import { PropsWithChildren } from "react";

import { styled } from "@mui/material";

const List = styled("dl")({
  margin: 0,
});

export function DefinitionList({ children }: PropsWithChildren) {
  return <List>{children}</List>;
}

const DefinitionItemLabel = styled("dt")({
  display: "inline-block",
  marginRight: "6px",
  fontSize: 16,
  "&::after": {
    content: '":"',
  },
});

const DefinitionItemValue = styled("dd")({
  fontSize: 16,
  display: "inline-block",
  margin: 0,
  lineHeight: "2rem",
});

type DefinitionItemProps = PropsWithChildren & {
  label: string;
};

export function DefinitionItem({ label, children }: DefinitionItemProps) {
  return (
    <div>
      <DefinitionItemLabel>{label}</DefinitionItemLabel>
      <DefinitionItemValue>{children}</DefinitionItemValue>
    </div>
  );
}
