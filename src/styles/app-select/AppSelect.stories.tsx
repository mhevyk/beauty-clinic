import { Icon } from "@iconify/react/dist/iconify.js";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import AppSelect from "@/styles/app-select/AppSelect";
import { AppSelectProps, Option } from "@/styles/app-select/AppSelect.types";

const meta: Meta = {
  title: "AppSelect",
  component: AppSelect,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<AppSelectProps>;

const generateOptions = (start: number, count: number) =>
  Array.from(
    { length: count },
    (_, index): Option => ({
      value: `Option ${start + index + 1}`,
    })
  );

export const Default: Story = {
  render: () => {
    const options = generateOptions(0, 100);

    return (
      <AppSelect
        label="Select"
        options={options}
        height={200}
        width={300}
        itemSize={40}
      />
    );
  },
};

export const SingleSelect: Story = {
  render: () => {
    const options = generateOptions(0, 100);

    return (
      <AppSelect
        label="Select"
        options={options}
        height={200}
        width={300}
        itemSize={40}
      />
    );
  },
};

export const MultipleSelect: Story = {
  render: () => {
    const options = generateOptions(0, 100);

    return (
      <AppSelect
        label="Select"
        type="multiple"
        options={options}
        height={200}
        width={300}
        itemSize={40}
      />
    );
  },
};

export const CustomOptionComponent: Story = {
  render: () => {
    const options = generateOptions(0, 100);

    return (
      <AppSelect
        label="Select"
        type="multiple"
        options={options}
        height={200}
        width={300}
        itemSize={40}
        renderOptions={({ item, isSelected, onSelect, style }) => {
          if (!item) {
            return null;
          }

          return (
            <div
              style={{
                ...style,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: isSelected ? "#d3f9d8" : "#fff",
              }}
              onClick={() => onSelect(item as Option)}
            >
              <p style={{ margin: 0 }}>{item.value}</p>
            </div>
          );
        }}
      />
    );
  },
};

export const WithOptionFetching: Story = {
  render: () => {
    const [options, setOptions] = useState<Option[]>(generateOptions(0, 20));
    const [hasMore, setHasMore] = useState(true);

    const fetchMoreOptions = async () => {
      return new Promise<void>(resolve => {
        setTimeout(() => {
          const newOptions = generateOptions(options.length, 20);
          setOptions(prev => [...prev, ...newOptions]);

          if (options.length + 20 >= 100) {
            setHasMore(false);
          }
          resolve();
        }, 2000);
      });
    };

    return (
      <AppSelect
        label="Select"
        height={200}
        width={300}
        options={options}
        loadMoreOptions={fetchMoreOptions}
        hasMore={hasMore}
      />
    );
  },
};

export const WithCustomAdornment: Story = {
  render: () => {
    const options = generateOptions(0, 100);

    return (
      <AppSelect
        label="Select"
        options={options}
        height={200}
        width={300}
        itemSize={40}
        selectedAdornment={
          <Icon icon="tabler:circle-check" width="24" height="24" />
        }
      />
    );
  },
};

export const WithDisabledOptions: Story = {
  render: () => {
    const options = generateOptions(0, 100);
    if (options[0]) {
      options[0].disabled = true;
    }

    return (
      <AppSelect
        label="Select"
        options={options}
        height={200}
        width={300}
        itemSize={40}
        selectedAdornment={
          <Icon icon="tabler:circle-check" width="24" height="24" />
        }
      />
    );
  },
};
