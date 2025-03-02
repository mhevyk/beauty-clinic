import { Icon } from "@iconify/react";
import {
  KeyboardEvent,
  ReactNode,
  Ref,
  forwardRef,
  useCallback,
  useMemo,
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
  AppSelectOptionMap,
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
    options,
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

  const [selectedOptionsMap, setSelectedOptionsMap] = useState<
    AppSelectOptionMap<Option>
  >(() => {
    if (restProps.type === "multiple") {
      return new Map(
        restProps.value?.map(option => [option.value, option]) ?? []
      );
    }

    return new Map(
      restProps.value ? [[restProps.value.value, restProps.value]] : []
    );
  });

  const handleToggleList = useThrottle(() => setIsOpen(prev => !prev), 300);

  const handleToggleWithKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (
      event.key === KEYBOARD_KEYS.Enter ||
      event.key === KEYBOARD_KEYS.Space
    ) {
      handleToggleList();
    }
  };

  const isItemSelected = useCallback(
    (item: Option) => {
      return selectedOptionsMap.has(item.value);
    },
    [selectedOptionsMap]
  );

  const getFirstOption = useCallback(
    (optionsMap: AppSelectOptionMap<Option>) => {
      return optionsMap.values().next().value ?? null;
    },
    []
  );

  const getAllOptions = useCallback(
    (optionsMap: AppSelectOptionMap<Option>) => {
      return Array.from(optionsMap.values());
    },
    []
  );

  const toggleOptionInSingleSelect = useCallback(
    (optionsMap: AppSelectOptionMap<Option>, option: Option) => {
      const value = option.value;

      if (optionsMap.has(value)) {
        optionsMap.clear();
      } else {
        optionsMap.clear();
        optionsMap.set(value, option);
      }
    },
    []
  );

  const toggleOptionInMultipleSelect = useCallback(
    (optionsMap: AppSelectOptionMap<Option>, option: Option) => {
      const value = option.value;

      if (optionsMap.has(value)) {
        optionsMap.delete(value);
      } else {
        optionsMap.set(value, option);
      }
    },
    []
  );

  const handleSelect = useCallback(
    (option: Option) => {
      if (option.isDisabled) {
        return;
      }

      setSelectedOptionsMap(prevOptionsMap => {
        const newOptionsMap = new Map(prevOptionsMap);
        const isMultiple = restProps.type === "multiple";

        if (isMultiple) {
          toggleOptionInMultipleSelect(newOptionsMap, option);
          restProps.onChange?.(getAllOptions(newOptionsMap));
        } else {
          toggleOptionInSingleSelect(newOptionsMap, option);
          restProps.onChange?.(getFirstOption(newOptionsMap));
        }

        return newOptionsMap;
      });
    },
    [restProps.type, restProps.onChange]
  );

  const handleSelectWithKeyboard = useCallback(
    (event: KeyboardEvent<HTMLDivElement>, item: Option) => {
      if (event.key === KEYBOARD_KEYS.Enter) {
        handleSelect(item);
      }
    },
    [handleSelect]
  );

  const selectButtonLabel = useMemo(() => {
    if (selectedOptionsMap.size > 1) {
      return `${selectedOptionsMap.size} items selected`;
    }

    const selectedOption = getFirstOption(selectedOptionsMap);

    if (selectedOption) {
      return selectedOption.label;
    }

    return placeholder ?? "Select an option";
  }, [selectedOptionsMap, getFirstOption, placeholder]);

  const containerWidth = fullWidth ? "100%" : WIDTH;

  const renderFallbackContainerWith = useCallback(
    (content: ReactNode) => {
      return (
        <div
          style={{ width: containerWidth }}
          className={classNames("app-select__list app-select__no-items", {
            "app-select--expanded": isOpen,
          })}
        >
          {content}
        </div>
      );
    },
    [containerWidth, isOpen]
  );

  const renderSelectList = () => {
    if (isFetchingOptions) {
      return renderFallbackContainerWith(<AppSpinner />);
    }

    if (options.length === 0) {
      return renderFallbackContainerWith(
        <AppTypography>No options found</AppTypography>
      );
    }

    return (
      <FixedSizeList<FixedSizeListProps<Option>>
        className={classNames("app-select__list", {
          "app-select--expanded": isOpen,
        })}
        height={HEIGHT}
        width={containerWidth}
        itemCount={options.length + (isFetchingOptions ? 1 : 0)}
        itemSize={ITEM_SIZE}
        itemData={{
          options,
          isItemSelected,
          onSelect: handleSelect,
          onSelectWithKeyboard: handleSelectWithKeyboard,
          renderOption,
        }}
        overscanCount={OVERSCAN_COUNT}
      >
        {AppSelectItem}
      </FixedSizeList>
    );
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
            <AppTypography>{selectButtonLabel}</AppTypography>
          </div>
          {renderSelectList()}
        </div>
      }
    />
  );
};

AppSelect.displayName = "AppSelect";

export default forwardRef(AppSelect);
