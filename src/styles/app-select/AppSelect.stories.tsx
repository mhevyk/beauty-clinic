import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import AppSelect from "@/styles/app-select/AppSelect";
import {
  AppOption,
  AppSelectProps,
  AppSelectRenderOptionProps,
} from "@/styles/app-select/AppSelect.types";
import AppTypography from "@/styles/app-typography/AppTypography";

const meta: Meta = {
  title: "AppSelect",
  component: AppSelect,
  tags: ["autodocs"],
  parameters: {
    docs: {
      story: {
        height: "250px",
      },
    },
  },
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
    const [value, setValue] = useState<AppOption | null>(null);
    return <AppSelect options={options} value={value} onChange={setValue} />;
  },
};

export const SingleSelect: Story = {
  render: () => {
    const [value, setValue] = useState<AppOption | null>(null);
    return <AppSelect options={options} value={value} onChange={setValue} />;
  },
};

export const MultipleSelect: Story = {
  render: () => {
    const [values, setValues] = useState<AppOption[]>([]);

    return (
      <AppSelect
        type="multiple"
        options={options}
        value={values}
        onChange={setValues}
      />
    );
  },
};

export const WithCustomRenderedOption: Story = {
  render: () => {
    const [value, setValue] = useState<AppOption | null>(null);

    const renderOption = ({
      item,
      isSelected,
      onSelect,
      style,
    }: AppSelectRenderOptionProps<AppOption>) => {
      if (!item) {
        return null;
      }

      const optionStyle = {
        ...style,
        display: "flex",
        alignItems: "center",
        backgroundColor: isSelected ? "#d3f9d8" : "#fff",
      };

      return (
        <div style={optionStyle} onClick={() => onSelect(item)}>
          <AppTypography>{item.value}</AppTypography>
        </div>
      );
    };

    return (
      <AppSelect
        value={value}
        onChange={setValue}
        options={options}
        renderOption={renderOption}
      />
    );
  },
};

export const WithLoadingState: Story = {
  render: () => {
    const [value, setValue] = useState<AppOption | null>(null);

    return (
      <AppSelect
        options={options}
        value={value}
        onChange={setValue}
        isFetchingOptions
      />
    );
  },
};

export const WithNoOptions: Story = {
  render: () => {
    const [value, setValue] = useState<AppOption | null>(null);
    return <AppSelect options={[]} value={value} onChange={setValue} />;
  },
};
//   render: () => {
//     const [paginatedOptions, setPaginatedOptions] = useState<AppOption[]>([]);
//     const [isLoadingOptions, setIsLoadingOptions] = useState(false);
//     const [selectedOption, setSelectedOption] = useState<AppOption | null>(
//       null
//     );

//     const fetchMoreOptions = async () => {
//       return new Promise<void>(resolve => {
//         setIsLoadingOptions(true);
//         setTimeout(() => {
//           setPaginatedOptions(generateOptions(0, 20));
//           setIsLoadingOptions(false);
//           resolve();
//         }, 3000);
//       });
//     };

//     useEffect(() => {
//       fetchMoreOptions();
//     }, []);

//     return (
//       <AppSelect
//         options={paginatedOptions}
//         value={selectedOption}
//         onChange={setSelectedOption}
//         isFetchingOptions={isLoadingOptions}
//       />
//     );
//   },
// };

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
    const disabledOptionIndexes = [0, 2, 6, 15];
    const optionsWithDisabled = options.map((option, index) => {
      return {
        ...option,
        isDisabled: disabledOptionIndexes.includes(index),
      };
    });

    const [value, setValue] = useState<AppOption | null>(null);

    return (
      <AppSelect
        options={optionsWithDisabled}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const FullWidth: Story = {
  render: () => {
    const [value, setValue] = useState<AppOption | null>(null);

    return (
      <AppSelect
        options={options}
        value={value}
        onChange={setValue}
        fullWidth
      />
    );
  },
};
