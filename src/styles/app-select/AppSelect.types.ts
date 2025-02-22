// import { CSSProperties, KeyboardEvent } from "react";

// import { AppFormControlMeta } from "@/styles/app-form-control/AppFormControl.types";

// export type AppOption = {
//   value: string;
//   disabled?: boolean;
// };

// type AppSelectSingleProps = {
//   type: "single"
//   onChange: (selected: AppOption | null) => void;
// }

// type AppSelectMultipleProps = {
//   type: "multiple";
//   onChange: (selected: AppOption[]) => void;
// }

// type AppSelectUnionProps = AppSelectSingleProps | AppSelectMultipleProps;

// export type SelectedState = AppOption["value"][] | AppOption["value"] | null;

// export type AppSelectProps = {
//   options: AppOption[];
//   height: number | string;
//   width: number | string;
//   label: string;
//   itemSize?: number;
//   renderOption?: (props: AppSelectRenderItemProps) => JSX.Element | null;
//   loadMoreOptions?: () => Promise<void>;
//   isFetchingOptions?: boolean;
// } & AppFormControlMeta & AppSelectUnionProps;

// export type AppSelectItemProps = {
//   index: number;
//   style: CSSProperties;
//   data: {
//     options: AppOption[];
//     isItemSelected: (item: AppOption) => boolean;
//     onSelect: (item: AppOption) => void;
//     onSelectWithKeyboard: (
//       event: KeyboardEvent<HTMLDivElement>,
//       item: AppOption
//     ) => void;
//     renderOption?: (props: AppSelectRenderItemProps) => JSX.Element | null;
//     isLoading?: boolean;
//   };
// };

// export type AppSelectRenderItemProps = {
//   item?: AppOption;
//   isSelected: boolean;
//   onSelect: (item: AppOption) => void;
//   style: CSSProperties;
// };

// export type HandleScroll = {
//   scrollOffset: number;
//   scrollHeight: number;
// };
import { CSSProperties, KeyboardEvent } from "react";

import { AppFormControlMeta } from "@/styles/app-form-control/AppFormControl.types";

export type AppOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type AppSelectSingleProps<Option extends AppOption> = {
  type?: "single";
  value: Option;
  onChange?: (selected: Option | null) => void;
};

type AppSelectMultipleProps<Option extends AppOption> = {
  type: "multiple";
  value: Option[];
  onChange?: (selected: Option[]) => void;
};

export type AppSelectUnionProps<Option extends AppOption> =
  | AppSelectSingleProps<Option>
  | AppSelectMultipleProps<Option>;

export type AppSelectProps<Option extends AppOption> = {
  options: Option[];
  height: number | string;
  width: number | string;
  label: string;
  itemSize?: number;
  renderOption?: (props: AppSelectRenderItemProps<Option>) => JSX.Element | null;
  loadMoreOptions?: () => Promise<void>;
  isFetchingOptions?: boolean;
} & AppFormControlMeta &
  AppSelectUnionProps<AppOption>;

export type AppSelectItemProps<Option extends AppOption> = {
  index: number;
  style: CSSProperties;
  data: {
    options: Option[];
    isItemSelected: (item: Option) => boolean;
    onSelect: (item: Option) => void;
    onSelectWithKeyboard: (
      event: KeyboardEvent<HTMLDivElement>,
      item: Option
    ) => void;
    renderOption?: (props: AppSelectRenderItemProps<Option>) => JSX.Element | null;
    isLoading?: boolean;
  };
};

export type AppSelectRenderItemProps<Option extends AppOption> = {
  item?: Option;
  isSelected: boolean;
  onSelect: (item: Option) => void;
  style: CSSProperties;
};

export type HandleScroll = {
  scrollOffset: number;
  scrollHeight: number;
};
