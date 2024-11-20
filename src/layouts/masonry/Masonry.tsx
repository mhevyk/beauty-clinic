import { PropsWithChildren } from "react";

import { MasonryBox } from "@/layouts/masonry/Masonry.styled";

type Breakpoint = {
  [breakpoint: string]: number;
};

export type MasonryProps = {
  gap?: string;
  columnsByBreakpoint?: Breakpoint;
  columnCount?: number;
};

export default function Masonry(props: MasonryProps & PropsWithChildren) {
  return <MasonryBox {...props}>{props.children}</MasonryBox>;
}
