import { CSSProperties, KeyboardEvent, ReactNode } from "react";

import { AppFormControlMeta } from "@/styles/app-form-control/AppFormControl.types";

export type AppOption = {
  label: string;
  value: string;
  isDisabled?: boolean;
};

type AppSelectSingleProps<Option extends AppOption> = {
  type?: "single";
  value: Option | null;
  onChange: (selected: Option | null) => void;
};

type AppSelectMultipleProps<Option extends AppOption> = {
  type: "multiple";
  value: Option[];
  onChange?: (selected: Option[]) => void;
};

export type AppSelectRenderItemProps<Option extends AppOption> = {
  item?: Option;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: (item: Option) => void;
  style: CSSProperties;
};

type RenderSelectOption<Option extends AppOption> = (
  props: AppSelectRenderItemProps<Option>
) => ReactNode;

export type AppSelectProps<Option extends AppOption> = {
  options: Option[];
  label?: string;
  fullWidth?: boolean;
  renderOption?: RenderSelectOption<Option>;
  isFetchingOptions?: boolean;
} & AppFormControlMeta &
  (AppSelectSingleProps<Option> | AppSelectMultipleProps<Option>);

type OnSelectWithKeyboard<Option extends AppOption> = (
  event: KeyboardEvent<HTMLDivElement>,
  item: Option
) => void;

export type FixedSizeListProps<Option extends AppOption> = {
  options: Option[];
  isItemSelected: (item: Option) => boolean;
  onSelect: (item: Option) => void;
  onSelectWithKeyboard: OnSelectWithKeyboard<Option>;
  renderOption?: RenderSelectOption<Option>;
};

export type AppSelectItemProps<Option extends AppOption> = {
  index: number;
  style: CSSProperties;
  data: FixedSizeListProps<Option>;
};
