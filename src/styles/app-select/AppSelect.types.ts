import { CSSProperties } from "react";

import { AppAdornment } from "@/styles/types";

export type Option = {
  value: string;
  disabled?: boolean;
};

export type AppSelectProps = {
  options: Option[];
  height: number | string;
  width: number | string;
  label: string;
  overscanCount?: number;
  itemSize?: number;
  type?: "single" | "multiple";
  onChange?: (selected: string[]) => void;
  renderOptions?: (props: RenderItemProps) => JSX.Element | null;
  loadMoreOptions?: () => Promise<void>;
  hasMore?: boolean;
  selectedAdornment?: AppAdornment;
};

export type ItemProps = {
  index: number;
  style: CSSProperties;
  data: {
    options: Option[];
    isSelected: (item: Option) => boolean;
    onSelect: (item: Option) => void;
    renderOptions?: (props: RenderItemProps) => JSX.Element | null;
    loading?: boolean;
    selectedAdornment?: AppAdornment;
  };
};

export type RenderItemProps = {
  item?: Option;
  isSelected: boolean;
  onSelect: (item: Option) => void;
  style: CSSProperties;
};
