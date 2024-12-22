import { Meta, StoryObj } from "@storybook/react";
import { useEffect, useRef, useState } from "react";

import CloseIconThin from "@/assets/icons/close-icon-thin.svg";
import Heart from "@/assets/icons/heart.svg";
import SearchIcon from "@/assets/icons/search.svg";

import AppTextInput from "@/styles/app-text-input/AppTextInput";
import { AppTextInputProps } from "@/styles/app-text-input/AppTextInput.types";

const meta: Meta<AppTextInputProps> = {
  title: "AppTextInput",
  component: AppTextInput,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<AppTextInputProps>;

export const Default: Story = {};

export const Filled: Story = {
  args: {
    variant: "filled",
  },
};

export const Underlined: Story = {
  args: {
    variant: "underlined",
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "Disabled",
  },
};

export const CustomMinWidth: Story = {
  args: {
    minWidth: "200px",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Name*",
  },
};

export const WithHelperText: Story = {
  args: {
    helperText: "Helper text",
  },
};

export const WithErrorMessage: Story = {
  args: {
    errorMessage: "Error message",
  },
};

export const WithLabelAndHelperText: Story = {
  args: {
    label: "Name*",
    helperText: "Helper text",
  },
};

export const WithLabelAndErrorMessage: Story = {
  args: {
    label: "Name*",
    errorMessage: "Error message",
  },
};

export const WithHelperTextAndErrorMessage: Story = {
  args: {
    helperText: "Helper text",
    errorMessage: "Error message",
  },
};

export const WithStartAdornment: Story = {
  args: {
    startAdornment: <Heart />,
  },
};

export const WithEndAdornement: Story = {
  args: {
    endAdornment: <Heart />,
  },
};

export const WithBothAdornments: Story = {
  args: {
    startAdornment: <Heart />,
    endAdornment: <SearchIcon />,
  },
};

const PHONE_MASK = [
  "(",
  /\d/,
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const WithMask: Story = {
  args: {
    placeholder: "(___) ___-____",
    mask: PHONE_MASK,
  },
};

export const Search: Story = {
  args: {
    label: "Phone number*",
    helperText: "Phone number should be in US format",
    placeholder: "Search phone number...",
    mask: PHONE_MASK,
  },
  render: props => {
    const [value, setValue] = useState("");
    const ref = useRef<HTMLInputElement | null>(null);

    const endAdornment =
      value.length > 0 ? (
        <CloseIconThin onClick={() => setValue("")} />
      ) : (
        <SearchIcon />
      );

    useEffect(() => {
      ref.current?.focus();
    }, []);

    return (
      <AppTextInput
        innerRef={ref}
        value={value}
        onChange={event => setValue(event.target.value)}
        endAdornment={endAdornment}
        {...props}
      />
    );
  },
};
