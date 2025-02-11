import { Meta, StoryObj } from "@storybook/react";

import AppButton from "@/styles/app-button/AppButton";
import AppTooltip from "@/styles/app-tooltip/AppTooltip";
import { AppTooltipProps } from "@/styles/app-tooltip/AppTooltip.types";

const meta: Meta<AppTooltipProps> = {
  title: "AppTooltip",
  component: AppTooltip,
  tags: ["autodocs"],
  decorators: Story => (
    <div style={{ padding: "80px", display: "flex", justifyContent: "center" }}>
      <Story />
    </div>
  ),
};

export default meta;

type Story = StoryObj<AppTooltipProps>;

export const Default: Story = {
  args: {
    content: "Click me",
  },

  render: args => (
    <AppTooltip {...args}>
      <AppButton>Hover me</AppButton>
    </AppTooltip>
  ),
};

export const Bottom: Story = {
  args: {
    position: "bottom",
    content: "Click me",
  },

  render: args => (
    <AppTooltip {...args}>
      <AppButton>Hover me</AppButton>
    </AppTooltip>
  ),
};

export const Left: Story = {
  args: {
    position: "left",
    content: "Click me",
  },

  render: args => (
    <AppTooltip {...args}>
      <AppButton>Hover me</AppButton>
    </AppTooltip>
  ),
};

export const Right: Story = {
  args: {
    position: "right",
    content: "Click me",
  },

  render: args => (
    <AppTooltip {...args}>
      <AppButton>Hover me</AppButton>
    </AppTooltip>
  ),
};

export const Medium: Story = {
  args: {
    width: "medium",
    position: "bottom",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has",
  },
  parameters: {
    docs: {
      story: {
        height: "300px",
      },
    },
  },

  render: args => (
    <AppTooltip {...args}>
      <AppButton>Hover me</AppButton>
    </AppTooltip>
  ),
};

export const Large: Story = {
  args: {
    width: "large",
    position: "bottom",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  parameters: {
    docs: {
      story: {
        height: "300px",
      },
    },
  },

  render: args => (
    <AppTooltip {...args}>
      <AppButton>Hover me</AppButton>
    </AppTooltip>
  ),
};
