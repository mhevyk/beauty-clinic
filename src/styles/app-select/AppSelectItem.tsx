import { Icon } from "@iconify/react";

import classNames from "classnames";

import {
  AppOption,
  AppSelectItemProps,
} from "@/styles/app-select/AppSelect.types";
import AppTypography from "@/styles/app-typography/AppTypography";

const AppSelectItem = <Option extends AppOption>({
  index,
  style,
  data,
}: AppSelectItemProps<Option>) => {
  const {
    options,
    focusedIndex,
    isItemSelected,
    onSelect,
    onSelectWithKeyboard,
    renderOption,
  } = data;

  const item = options[index];

  if (!item) {
    return null;
  }

  const isSelected = isItemSelected(item);
  const isDisabled = item.isDisabled ?? false;

  if (renderOption) {
    return renderOption({
      item,
      isDisabled,
      isSelected,
      onSelect,
      style,
    });
  }

  return (
    <div
      role="option"
      className={classNames("app-select__list-item", {
        "app-select__list-item--disabled": isDisabled,
        "app-select__list-item--selected": isSelected,
        "app-select__list-item--focused": focusedIndex === index,
      })}
      style={style}
      onClick={() => onSelect(item)}
      onKeyUp={event => {
        onSelectWithKeyboard(event, item);
      }}
      tabIndex={isDisabled ? -1 : 0}
      aria-disabled={isDisabled}
      aria-selected={isSelected}
    >
      <AppTypography>{item.label}</AppTypography>

      <Icon
        icon="si:check-duotone"
        width="20"
        height="20"
        className="app-select__selected-adorment"
        aria-hidden={!isSelected}
      />
    </div>
  );
};

AppSelectItem.displayName = "Item";

export default AppSelectItem;
