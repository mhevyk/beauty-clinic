import { Meta, StoryObj } from "@storybook/react";

import AppSpinner from "@/styles/app-spinner/AppSpinner.tsx";
import { AppSpinnerProps } from "@/styles/app-spinner/AppSpinner.types.ts";

const meta: Meta<AppSpinnerProps> = {
  title: "AppSpinner",
  component: AppSpinner,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "Dark",
    },
  },
  decorators: Story => (
    <div
      style={{
        width: "300px",
        height: "300px",
      }}
    >
      <Story />
    </div>
  ),
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

export const WithLabel: Story = {
  args: {
    label: "Loading...",
  },
};
