import { Icon } from "@iconify/react";
import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import AppIconButton from "@/styles/app-icon-button/AppIconButton";
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
    startAdornment: <Icon icon="fluent:heart-16-filled" />,
  },
};

export const WithEndAdornement: Story = {
  args: {
    endAdornment: <Icon icon="fluent:heart-16-filled" />,
  },
};

export const WithBothAdornments: Story = {
  args: {
    startAdornment: <Icon icon="fluent:heart-16-filled" />,
    endAdornment: <Icon icon="ion:search-outline" />,
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
  render: args => {
    const [value, setValue] = useState("");

    const endAdornment =
      value.length > 0 ? (
        <AppIconButton
          icon="ic:sharp-close"
          size={20}
          onClick={() => setValue("")}
        />
      ) : (
        <Icon
          icon="ion:search-outline"
          width={20}
          height={20}
          style={{ padding: "8px" }}
          aria-hidden="true"
        />
      );

    return (
      <AppTextInput
        value={value}
        onChange={event => setValue(event.target.value)}
        endAdornment={endAdornment}
        {...args}
      />
    );
  },
};
