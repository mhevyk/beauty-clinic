import { Icon } from "@iconify/react";
import {
  KeyboardEvent,
  Ref,
  forwardRef,
  memo,
  useCallback,
  useRef,
  useState,
} from "react";
import { FixedSizeList, areEqual } from "react-window";

import classNames from "classnames";

import { KEYBOARD_KEYS } from "@/constants";
import useThrottle from "@/hooks/use-throttle/useThrottle";
import AppFormControl from "@/styles/app-form-control/AppFormControl";
import "@/styles/app-select/AppSelect.scss";
import {
  AppOption,
  AppSelectItemProps,
  AppSelectProps,
  HandleScroll,
  SelectedState,
} from "@/styles/app-select/AppSelect.types";
import AppSpinner from "@/styles/app-spinner/AppSpinner";
import AppTypography from "@/styles/app-typography/AppTypography";

const OVERSCAN_COUNT = 10;

const AppSelect = (
  {
    options,
    onChange,
    height,
    width,
    label,
    type = "single",
    renderOption,
    itemSize = 50,
    loadMoreOptions,
    isFetchingOptions,
    controlRef,
    errorMessage,
    helperText,
  }: AppSelectProps,
  ref: Ref<HTMLDivElement>
) => {
  const initialState = type === "multiple" ? [] : null;

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<SelectedState>(initialState);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSelect = useCallback((item: AppOption) => {
    if (item.disabled) {
      return;
    }

    if (type === "multiple") {
      setSelected(prevSelected => {
        const updatedSelected = prevSelected.includes(item.value)
          ? prevSelected.filter(option => option !== item.value)
          : [...prevSelected, item.value];

        onChange?.(updatedSelected);

        return updatedSelected;
      });
    } else {
      setSelected(prevSelected => {
        const updatedSelected: AppOption["value"] | null =
          prevSelected === item.value ? null : item.value;

        onChange?.(updatedSelected);

        return updatedSelected;
      });
    }
  }, []);

  const handleSelectWithKeyboard = (
    event: KeyboardEvent<HTMLDivElement>,
    item: AppOption
  ) => {
    if (event.key === KEYBOARD_KEYS.Enter) {
      handleSelect(item);
    }
  };

  const isItemSelected = (item: { value: string }) =>
    selected.includes(item.value);

  const handleScroll = async ({ scrollOffset, scrollHeight }: HandleScroll) => {
    if (
      scrollOffset + Number(height) >= scrollHeight &&
      isFetchingOptions &&
      !isLoading
    ) {
      setIsLoading(true);
      await loadMoreOptions?.();
      setIsLoading(false);
    }
  };

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

          <FixedSizeList
            ref={listRef}
            className={classNames("app-select__list", {
              "app-select--expanded": isOpen,
            })}
            height={height}
            width={width}
            itemCount={options.length + (isFetchingOptions ? 1 : 0)}
            itemSize={itemSize}
            itemData={{
              options,
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

const Item = memo(({ index, style, data }: AppSelectItemProps) => {
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

  const isSelected = isItemSelected(item as { value: string });
  const isDisabled = item.disabled;

  if (renderOption) {
    return renderOption({
      item,
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
      <AppTypography>{item.value}</AppTypography>

      <Icon
        icon="si:check-duotone"
        width="20"
        height="20"
        className="app-select__selected-adorment"
        aria-hidden={!isSelected}
      />

      {/*TODO: Add tooltip*/}
    </div>
  );
}, areEqual);

Item.displayName = "Item";

export default forwardRef(AppSelect);
