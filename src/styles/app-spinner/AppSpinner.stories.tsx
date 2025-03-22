import { Meta, StoryObj } from "@storybook/react";

import AppSpinner from "@/styles/app-spinner/AppSpinner.tsx";
import { AppSpinnerProps } from "@/styles/app-spinner/AppSpinner.types.ts";

const meta: Meta<AppSpinnerProps> = {
  title: "AppSpinner",
  component: AppSpinner,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<AppSpinnerProps>;

export const Default: Story = {};

export const LargeSize: Story = {
  args: {
    size: "lg",
  },
};

export const FullScreen: Story = {
  args: {
    fullScreen: true,
  },
};
