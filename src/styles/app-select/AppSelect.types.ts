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

export type AppSelectRenderOptionProps<Option extends AppOption> = {
  item?: Option;
  isSelected: boolean;
  isDisabled: boolean;
  onSelect: (item: Option, index?: number) => void;
  style: CSSProperties;
};

type RenderSelectOption<Option extends AppOption> = (
  props: AppSelectRenderOptionProps<Option>
) => ReactNode;

export type AppSelectOptionMap<Option extends AppOption> = Map<
  Option["value"],
  Option
>;

export type AppSelectProps<Option extends AppOption> = {
  options: Option[];
  label?: string;
  fullWidth?: boolean;
  renderOption?: RenderSelectOption<Option>;
  isFetchingOptions?: boolean;
  placeholder?: string;
} & AppFormControlMeta &
  (AppSelectSingleProps<Option> | AppSelectMultipleProps<Option>);

type OnSelectWithKeyboard<Option extends AppOption> = (
  event: KeyboardEvent<HTMLDivElement>,
  item: Option
) => void;

export type FixedSizeListProps<Option extends AppOption> = {
  options: Option[];
  focusedIndex: number;
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
