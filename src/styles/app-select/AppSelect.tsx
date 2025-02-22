import { Icon } from "@iconify/react";
import React, {
  KeyboardEvent,
  Ref,
  forwardRef,
  useCallback,
  useRef,
  useState,
} from "react";
import { FixedSizeList } from "react-window";

import classNames from "classnames";

import { KEYBOARD_KEYS } from "@/constants";
import useLoadOptions from "@/hooks/use-load-options/useLoadOptions";
import useThrottle from "@/hooks/use-throttle/useThrottle";
import AppFormControl from "@/styles/app-form-control/AppFormControl";
import "@/styles/app-select/AppSelect.scss";
import {
  AppOption,
  AppSelectItemProps,
  AppSelectProps,
  FixedSizeListProps,
} from "@/styles/app-select/AppSelect.types";
import AppSpinner from "@/styles/app-spinner/AppSpinner";
import AppTypography from "@/styles/app-typography/AppTypography";

const OVERSCAN_COUNT = 10;

const AppSelect = <Option extends AppOption>(
  {
    options: selectOptions,
    height,
    width,
    label,
    renderOption,
    itemSize = 50,
    loadMoreOptions,
    isFetchingOptions,
    controlRef,
    errorMessage,
    helperText,
    ...restProps
  }: AppSelectProps<Option>,
  ref: Ref<HTMLDivElement>
) => {
  const [isOpen, setIsOpen] = useState(false);

  const [selected, setSelected] = useState<Option[]>(() => {
    if (restProps.type === "multiple") {
      return restProps.value ?? [];
    }

    return restProps.value ? [restProps.value] : [];
  });

  const listRef = useRef<FixedSizeList>(null);

  const handleToggleList = useThrottle(() => setIsOpen(prev => !prev), 300);

  const handleToggleWithKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (
      event.key === KEYBOARD_KEYS.Enter ||
      event.key === KEYBOARD_KEYS.Space
    ) {
      handleToggleList();
    }
  };

  const isItemSelected = (item: Option) => {
    return selected.some(option => option.value === item.value);
  };

  const handleSelect = useCallback(
    (item: Option) => {
      if (item.isDisabled) {
        return;
      }

      let updatedSelected: Option[];

      if (restProps.type === "multiple") {
        updatedSelected = isItemSelected(item)
          ? selected.filter(option => option.value !== item.value)
          : [...selected, item];

        restProps.onChange?.(updatedSelected);
      } else {
        updatedSelected = isItemSelected(item) ? [] : [item];
        restProps.onChange?.(updatedSelected[0] ?? null);
      }

      setSelected(updatedSelected);
    },
    [selected, restProps.onChange]
  );

  const handleSelectWithKeyboard = (
    event: KeyboardEvent<HTMLDivElement>,
    item: Option
  ) => {
    if (event.key === KEYBOARD_KEYS.Enter) {
      handleSelect(item);
    }
  };

  const { isLoading, handleScroll } = useLoadOptions(
    loadMoreOptions,
    isFetchingOptions,
    String(height)
  );

  return (
    <AppFormControl
      className="app-select"
      helperText={helperText}
      errorMessage={errorMessage}
      ref={controlRef}
      control={
        <div ref={ref}>
          <div
            style={{ width }}
            role="button"
            tabIndex={0}
            className="app-select__button"
            onClick={handleToggleList}
            onKeyUp={handleToggleWithKeyboard}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Collapse content" : "Expand content"}
            aria-haspopup="listbox"
          >
            <AppTypography>{label}</AppTypography>
            <Icon
              icon={
                isOpen ? "octicon:chevron-up-24" : "octicon:chevron-down-24"
              }
              width={24}
              height={24}
              aria-hidden="true"
            />
          </div>

          <FixedSizeList<FixedSizeListProps<Option>>
            ref={listRef}
            className={classNames("app-select__list", {
              "app-select--expanded": isOpen,
            })}
            height={height}
            width={width}
            itemCount={selectOptions.length + (isFetchingOptions ? 1 : 0)}
            itemSize={itemSize}
            itemData={{
              options: selectOptions,
              isItemSelected,
              onSelect: handleSelect,
              onSelectWithKeyboard: handleSelectWithKeyboard,
              renderOption,
              isLoading,
            }}
            overscanCount={OVERSCAN_COUNT}
            onScroll={({ scrollOffset }) => {
              const list = listRef.current;
              if (list) {
                handleScroll({
                  scrollOffset,
                  scrollHeight: list.props.itemSize * list.props.itemCount,
                });
              }
            }}
          >
            {Item}
          </FixedSizeList>
        </div>
      }
    />
  );
};

AppSelect.displayName = "AppSelect";

export default forwardRef(AppSelect);

const Item = <Option extends AppOption>({
  index,
  style,
  data,
}: AppSelectItemProps<Option>) => {
  const {
    options,
    isItemSelected,
    onSelect,
    onSelectWithKeyboard,
    renderOption,
    isLoading,
  } = data;

  if (index === options.length) {
    return (
      isLoading && (
        <div className="app-select__spinner" style={style}>
          <AppSpinner />
        </div>
      )
    );
  }

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
      className={classNames("app-select__list-item", {
        "app-select__list-item--disabled": isDisabled,
        "app-select__list-item--selected": isSelected,
      })}
      style={style}
      onClick={() => onSelect(item)}
      onKeyUp={event => onSelectWithKeyboard(event, item)}
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

Item.displayName = "Item";
