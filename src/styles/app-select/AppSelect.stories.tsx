import { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";

import AppSelect from "@/styles/app-select/AppSelect";
import { AppOption, AppSelectProps } from "@/styles/app-select/AppSelect.types";

const meta: Meta = {
  title: "AppSelect",
  component: AppSelect,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<AppSelectProps<AppOption>>;

const generateOptions = (start: number, count: number) =>
  Array.from(
    { length: count },
    (_, index): AppOption => ({
      label: `AppOption ${start + index + 1}`,
      value: String(index),
    })
  );

export const Default: Story = {
  render: () => {
    const options = generateOptions(0, 100);
    const [value, setValue] = useState<AppOption | null>(null);

    return (
      <AppSelect
        label="Select"
        value={value}
        onChange={setValue}
        options={options}
      />
    );
  },
};

export const SingleSelect: Story = {
  render: () => {
    const options = generateOptions(0, 100);
    const [value, setValue] = useState<AppOption | null>(null);

    return (
      <AppSelect
        label="Select"
        options={options}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const MultipleSelect: Story = {
  render: () => {
    const options = generateOptions(0, 100);
    const [value, setValue] = useState<AppOption[]>([]);

    return (
      <AppSelect
        label="Select"
        type="multiple"
        options={options}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const CustomOptionComponent: Story = {
  render: () => {
    const options = generateOptions(0, 100);
    const [value, setValue] = useState<AppOption[]>([]);

    return (
      <AppSelect
        value={value}
        onChange={setValue}
        label="Select"
        type="multiple"
        options={options}
        renderOption={({ item, isSelected, onSelect, style }) => {
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
              onClick={() => onSelect(item as AppOption)}
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
    const [options, setOptions] = useState<AppOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState<AppOption | null>(null);

    const fetchMoreOptions = async () => {
      return new Promise<void>(resolve => {
        setIsLoading(true);
        setTimeout(() => {
          setOptions(generateOptions(0, 20));
          setIsLoading(false);
          resolve();
        }, 3000);
      });
    };

    useEffect(() => {
      fetchMoreOptions();
    }, []);

    return (
      <AppSelect
        value={value}
        onChange={setValue}
        label="Select"
        options={options}
        isFetchingOptions={isLoading}
      />
    );
  },
};

export const WithErrorMessage: Story = {
  render: () => {
    const options = generateOptions(0, 100);
    const [value, setValue] = useState<AppOption | null>(null);

    return (
      <AppSelect
        label="Select"
        options={options}
        errorMessage="Error occured"
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithHelperText: Story = {
  render: () => {
    const options = generateOptions(0, 100);
    const [value, setValue] = useState<AppOption | null>(null);

    return (
      <AppSelect
        label="Select"
        options={options}
        helperText="Please, select an item"
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const WithDisabledOptions: Story = {
  render: () => {
    const options = generateOptions(0, 100);
    if (options[0]) {
      options[0].isDisabled = true;
    }
    const [value, setValue] = useState<AppOption | null>(null);

    return (
      <AppSelect
        value={value}
        onChange={setValue}
        label="Select"
        options={options}
      />
    );
  },
};

export const WithSelectedOptionsList: Story = {
  render: () => {
    const options = generateOptions(0, 100);
    const [value, setValue] = useState<AppOption[]>([]);

    return (
      <div>
        <AppSelect
          value={value}
          onChange={setValue}
          label="Selects"
          options={options}
          type="multiple"
        />
        <div style={{ marginTop: "20px" }}>
          <h3>Selected Options:</h3>
          <ul>
            {value.map(option => (
              <li key={option.value}>{option.label}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  },
};

export const WithNoResults: Story = {
  render: () => {
    const options: AppOption[] = [];
    const [value, setValue] = useState<AppOption | null>(null);

    return (
      <AppSelect
        value={value}
        onChange={setValue}
        label="Select"
        options={options}
        isFetchingOptions={false}
      />
    );
  },
};

export const WithoutLabel: Story = {
  render: () => {
    const options: AppOption[] = generateOptions(0, 100);
    const [value, setValue] = useState<AppOption | null>(null);

    return (
      <AppSelect
        value={value}
        onChange={setValue}
        options={options}
        isFetchingOptions={false}
      />
    );
  },
};

export const WithFullWidth: Story = {
  render: () => {
    const options: AppOption[] = generateOptions(0, 100);
    const [value, setValue] = useState<AppOption | null>(null);

    return (
      <AppSelect
        label="Select"
        value={value}
        onChange={setValue}
        options={options}
        fullWidth
      />
    );
  },
};
