import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import AppTextarea from "@/styles/app-textarea/AppTextarea";
import { AppTextareaProps } from "@/styles/app-textarea/AppTextarea.types";

const meta: Meta<AppTextareaProps> = {
  title: "AppTextarea",
  component: AppTextarea,
  tags: ["autodocs"],
  args: {
    placeholder: "Type any text here...",
  },
};

export default meta;

type Story = StoryObj<AppTextareaProps>;

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

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Uncontrolled: Story = {
  args: {
    defaultValue:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.\nImpedit nam, pariatur hic voluptatem",
  },
};

export const Controlled = {
  render: (args: AppTextareaProps) => {
    const [value, setValue] = useState("");

    return (
      <AppTextarea
        {...args}
        value={value}
        onChange={event => setValue(event.target.value)}
      />
    );
  },
};

export const Autoresisable: Story = {
  args: {
    isAutoresisable: true,
  },
};

export const WithLabel: Story = {
  args: {
    label: "Description*",
  },
};

export const WithHelperText: Story = {
  args: {
    helperText: "Helper text",
  },
};

export const WithErrorMessage: Story = {
  args: {
    errorMessage: "Error",
  },
};
