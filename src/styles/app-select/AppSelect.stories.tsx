import { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";

import AppSelect from "@/styles/app-select/AppSelect";
import {
  AppOption,
  AppSelectProps,
  AppSelectRenderOptionProps,
} from "@/styles/app-select/AppSelect.types";

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
      label: `Option ${start + index + 1}`,
      value: String(index),
    })
  );

const options = generateOptions(0, 100);

export const Default: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState<AppOption | null>(
      null
    );

    return (
      <AppSelect
        options={options}
        value={selectedOption}
        onChange={setSelectedOption}
      />
    );
  },
};

export const SingleSelect: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState<AppOption | null>(
      null
    );

    return (
      <AppSelect
        options={options}
        value={selectedOption}
        onChange={setSelectedOption}
      />
    );
  },
};

export const MultipleSelect: Story = {
  render: () => {
    const [selectedOptions, setSelectedOptions] = useState<AppOption[]>([]);

    return (
      <AppSelect
        type="multiple"
        options={options}
        value={selectedOptions}
        onChange={setSelectedOptions}
      />
    );
  },
};

export const WithCustomRenderedOption: Story = {
  render: () => {
    const [selectedOption, setSelectedOption] = useState<AppOption | null>(
      null
    );

    const renderOption = ({
      item,
      isSelected,
      onSelect,
      style,
    }: AppSelectRenderOptionProps<AppOption>) => {
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
          onClick={() => onSelect(item)}
        >
          <p style={{ margin: 0 }}>{item.value}</p>
        </div>
      );
    };

    return (
      <AppSelect
        value={selectedOption}
        onChange={setSelectedOption}
        options={options}
        renderOption={renderOption}
      />
    );
  },
};

export const WithOptionFetching: Story = {
  render: () => {
    const [paginatedOptions, setPaginatedOptions] = useState<AppOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState<AppOption | null>(null);

    const fetchMoreOptions = async () => {
      return new Promise<void>(resolve => {
        setIsLoading(true);
        setTimeout(() => {
          setPaginatedOptions(generateOptions(0, 20));
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
        options={paginatedOptions}
        value={value}
        onChange={setValue}
        isFetchingOptions={isLoading}
      />
    );
  },
};

export const WithLabel: Story = {
  render: () => {
    const [value, setValue] = useState<AppOption | null>(null);

    return (
      <AppSelect
        options={options}
        value={value}
        onChange={setValue}
        label="Employee"
      />
    );
  },
};

export const WithHelperText: Story = {
  render: () => {
    const [value, setValue] = useState<AppOption | null>(null);

    return (
      <AppSelect
        options={options}
        value={value}
        onChange={setValue}
        helperText="This is a required field"
      />
    );
  },
};

export const WithErrorMessage: Story = {
  render: () => {
    const [value, setValue] = useState<AppOption | null>(null);

    return (
      <AppSelect
        options={options}
        value={value}
        onChange={setValue}
        errorMessage="Error occured"
      />
    );
  },
};

export const WithDisabledOptions: Story = {
  render: () => {
    if (options[0]) {
      options[0].isDisabled = true;
    }

    const [value, setValue] = useState<AppOption | null>(null);

    return (
      <AppSelect
        options={options}
        value={value}
        onChange={setValue}
        label="Select"
      />
    );
  },
};

export const WithSelectedOptionsList: Story = {
  render: () => {
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
    const [value, setValue] = useState<AppOption | null>(null);

    return (
      <AppSelect
        value={value}
        onChange={setValue}
        label="Select"
        options={[]}
        isFetchingOptions={false}
      />
    );
  },
};

export const WithFullWidth: Story = {
  render: () => {
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
