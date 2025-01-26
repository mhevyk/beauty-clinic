import { Meta, StoryObj } from "@storybook/react";

import { APP_COLORS } from "@/styles";
import AppIconButton from "@/styles/app-icon-button/AppIconButton";
import { AppIconButtonProps } from "@/styles/app-icon-button/AppIconButton.types";

const meta: Meta<AppIconButtonProps> = {
  title: "AppIconButton",
  component: AppIconButton,
  tags: ["autodocs"],
  args: {
    icon: "mdi:home",
  },
  parameters: {
    docs: {
      story: {
        height: "50px",
      },
    },
  },
};

export default meta;

type Story = StoryObj<AppIconButtonProps>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const LargerIcon: Story = {
  args: {
    size: 100,
  },
};

export const WithCustomProps: Story = {
  args: {
    iconProps: {
      color: APP_COLORS.error,
    },
  },
};
