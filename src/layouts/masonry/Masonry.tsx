import { PropsWithChildren } from "react";

import { MasonryBox } from "@/layouts/masonry/Masonry.styled";

export type MasonryProps = {
  gap?: string;
  columnsByBreakpoint?: Record<string, number>;
  columnCount?: number;
};

export default function Masonry(props: MasonryProps & PropsWithChildren) {
  return <MasonryBox {...props}>{props.children}</MasonryBox>;
}
