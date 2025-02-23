import { Icon } from "@iconify/react";
import {
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
import useThrottle from "@/hooks/use-throttle/useThrottle";
import AppFormControl from "@/styles/app-form-control/AppFormControl";
import "@/styles/app-select/AppSelect.scss";
import {
  AppOption,
  AppSelectProps,
  FixedSizeListProps,
} from "@/styles/app-select/AppSelect.types";
import AppSelectItem from "@/styles/app-select/AppSelectItem";
import AppSpinner from "@/styles/app-spinner/AppSpinner";
import AppTypography from "@/styles/app-typography/AppTypography";

const OVERSCAN_COUNT = 10;
const ITEM_SIZE = 40;
const WIDTH = 300;
const HEIGHT = 200;

const AppSelect = <Option extends AppOption>(
  {
    options: selectOptions,
    label,
    renderOption,
    isFetchingOptions,
    controlRef,
    errorMessage,
    helperText,
    fullWidth = false,
    placeholder,
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

  const containerWidth = fullWidth ? "100%" : WIDTH;

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

  const getSelectButtonLabel = () => {
    if (selected.length > 1) {
      return `${selected.length} items selected`;
    }

    const selectedOption = selected[0];

    if (selectedOption) {
      return selectedOption.label;
    }

    return placeholder ?? "Select an option";
  };

  return (
    <AppFormControl
      className="app-select"
      helperText={helperText}
      errorMessage={errorMessage}
      ref={controlRef}
      fullWidth={fullWidth}
      label={label}
      control={
        <div ref={ref} style={{ width: containerWidth }}>
          <div
            style={{ width: containerWidth }}
            role="button"
            tabIndex={0}
            className="app-select__button"
            onClick={handleToggleList}
            onKeyUp={handleToggleWithKeyboard}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Collapse content" : "Expand content"}
            aria-haspopup="listbox"
          >
            <Icon
              icon={
                isOpen ? "octicon:chevron-up-24" : "octicon:chevron-down-24"
              }
              className="app-select__expand-icon"
              width={24}
              height={24}
              aria-hidden="true"
            />
            <AppTypography>{getSelectButtonLabel()}</AppTypography>
          </div>

          {selectOptions.length ? (
            <FixedSizeList<FixedSizeListProps<Option>>
              ref={listRef}
              className={classNames("app-select__list", {
                "app-select--expanded": isOpen,
              })}
              height={HEIGHT}
              width={containerWidth}
              itemCount={selectOptions.length + (isFetchingOptions ? 1 : 0)}
              itemSize={ITEM_SIZE}
              itemData={{
                options: selectOptions,
                isItemSelected,
                onSelect: handleSelect,
                onSelectWithKeyboard: handleSelectWithKeyboard,
                renderOption,
              }}
              overscanCount={OVERSCAN_COUNT}
            >
              {AppSelectItem}
            </FixedSizeList>
          ) : (
            <div
              style={{ width: containerWidth }}
              className={classNames("app-select__list app-select__no-items", {
                "app-select--expanded": isOpen,
              })}
            >
              {isFetchingOptions ? (
                <AppSpinner />
              ) : (
                <AppTypography>No options found</AppTypography>
              )}
            </div>
          )}
        </div>
      }
    />
  );
};

AppSelect.displayName = "AppSelect";

export default forwardRef(AppSelect);
