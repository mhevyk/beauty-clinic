import { CSSProperties } from "react";

import { Box, styled } from "@mui/material";

import { MasonryProps } from "@/layouts/masonry/Masonry";

export const MasonryBox = styled(Box, {
  shouldForwardProp: prop => prop !== "gap",
})<MasonryProps>(({ gap, columnsByBreakpoint, columnCount = 1 }) => ({
  columns: columnCount,
  columnGap: gap || 0,

  ...(columnsByBreakpoint
    ? Object.entries(columnsByBreakpoint).reduce(
        (acc: Record<string, CSSProperties>, [breakpoint, count]) => {
          acc[`@media (min-width: ${breakpoint})`] = {
            columns: count,
          };
          return acc;
        },
        {}
      )
    : {}),

  "& > *": {
    marginBottom: gap || 0,
  },
}));
