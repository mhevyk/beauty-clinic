import { PropsWithChildren } from "react";

import {
  DefinitionItemLabel,
  DefinitionItemValue,
  List,
} from "@/layouts/footer/components/DefinitionList/DefinitionList.styled";

export function DefinitionList({ children }: PropsWithChildren) {
  return <List>{children}</List>;
}

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
