import { Icon } from "@iconify/react";
import { KeyboardEvent, Ref, forwardRef, memo, useRef, useState } from "react";
import { FixedSizeList, areEqual } from "react-window";

import classNames from "classnames";

import useThrottle from "@/hooks/use-throttle/useThrottle";
import "@/styles/app-select/AppSelect.scss";
import { AppSelectProps, ItemProps } from "@/styles/app-select/AppSelect.types";
import AppSpinner from "@/styles/app-spinner/AppSpinner";

const AppSelect = (
  {
    options,
    onChange,
    height,
    width,
    label,
    type = "single",
    renderOptions,
    overscanCount = 10,
    itemSize = 50,
    loadMoreOptions,
    hasMore,
    selectedAdornment,
  }: AppSelectProps,
  ref: Ref<HTMLDivElement>
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FixedSizeList>(null);

  const handleToggleList = useThrottle(() => setIsOpen(prev => !prev), 300);

  const handleToggleWithKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      handleToggleList();
    }
  };

  const handleSelect = (item: { value: string; disabled?: boolean }) => {
    if (item.disabled) {
      return;
    }

    setSelected(prevSelected => {
      let updatedSelected: string[];

      if (type === "multiple") {
        updatedSelected = prevSelected.includes(item.value)
          ? prevSelected.filter(option => option !== item.value)
          : [...prevSelected, item.value];
      } else if (type === "single") {
        updatedSelected = prevSelected.includes(item.value) ? [] : [item.value];
      } else {
        updatedSelected = prevSelected;
      }

      if (onChange) {
        onChange(updatedSelected);
      }
      return updatedSelected;
    });
  };

  const isSelected = (item: { value: string }) => selected.includes(item.value);

  const handleScroll = async ({
    scrollOffset,
    scrollHeight,
  }: {
    scrollOffset: number;
    scrollHeight: number;
  }) => {
    if (scrollOffset + Number(height) >= scrollHeight && hasMore && !loading) {
      setLoading(true);
      await loadMoreOptions?.();
      setLoading(false);
    }
  };

  return (
    <div className="app-select" ref={ref}>
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
        <p>{label}</p>
        <Icon
          className="app-select_arrow-button"
          icon="tabler:chevron-down"
          width="24"
          height="24"
        />
      </div>

      <FixedSizeList
        ref={listRef}
        className={classNames("app-select__list", {
          "app-select--expanded": isOpen,
        })}
        height={height}
        width={width}
        itemCount={options.length + (hasMore ? 1 : 0)}
        itemSize={itemSize}
        itemData={{
          options,
          isSelected,
          onSelect: handleSelect,
          renderOptions,
          loading,
          selectedAdornment,
        }}
        overscanCount={overscanCount}
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
  );
};

const Item = memo(({ index, style, data }: ItemProps) => {
  const {
    options,
    isSelected,
    onSelect,
    renderOptions,
    loading,
    selectedAdornment,
  } = data;

  if (index === options.length) {
    return (
      <div className="app-select__spinner" style={style}>
        {loading && <AppSpinner />}
      </div>
    );
  }

  const item = options[index];

  if (!item) {
    return null;
  }

  const selected = isSelected(item as { value: string });
  const isDisabled = item.disabled;

  if (renderOptions) {
    return renderOptions({
      item,
      isSelected: selected,
      onSelect,
      style,
    });
  }

  return (
    <div
      className={classNames("app-select__list-item", {
        "app-select__list-item--disabled": isDisabled,
      })}
      style={style}
      onClick={() => onSelect(item)}
      tabIndex={isDisabled ? -1 : 0}
    >
      <p>{item.value}</p>
      {selected &&
        (selectedAdornment ?? (
          <Icon icon="si:check-duotone" width="24" height="24" />
        ))}

      <div
        className="app-select__custom-tooltip"
        role="tooltip"
        aria-hidden="true"
      >
        {item.value}
      </div>
    </div>
  );
}, areEqual);

Item.displayName = "Item";
AppSelect.displayName = "AppSelect";

export default forwardRef(AppSelect);
