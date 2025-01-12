import { ReactNode } from "react";

export type AppCollapsibleProps = {
  header: string;
  children: ReactNode;
} & (
  | {
      defaultExpanded?: never;
      expanded?: boolean;
      onExpandedChange?: (collapsed: boolean) => void;
    }
  | {
      defaultExpanded?: boolean;
      expanded?: never;
      onExpandedChange?: never;
    }
);
