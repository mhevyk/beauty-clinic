import { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import Heart from "@/assets/icons/heart.svg";

import { APP_COLORS } from "@/styles";
import AppButton from "@/styles/app-button/AppButton";
import { AppButtonProps } from "@/styles/app-button/AppButton.types";

const meta: Meta<AppButtonProps> = {
  title: "AppButton",
  component: AppButton,
  tags: ["autodocs"],
  args: { children: "Button" },
  decorators: Story => (
    <MemoryRouter>
      <Story />
    </MemoryRouter>
  ),
  parameters: {
    docs: {
      story: {
        height: "70px",
      },
    },
  },
};

export default meta;

type Story = StoryObj<AppButtonProps>;

export const Default: Story = {};

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const AsLink: Story = {
  args: {
    to: "/page1",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
  },

  render: args => (
    <>
      <AppButton {...args} variant="primary" />
      <AppButton {...args} variant="secondary" />
    </>
  ),
};

export const Medium: Story = {
  args: {
    size: "md",
  },

  render: args => (
    <>
      <AppButton {...args} variant="primary" />
      <AppButton {...args} variant="secondary" />
    </>
  ),
};

export const Large: Story = {
  args: {
    size: "lg",
  },

  render: args => (
    <>
      <AppButton {...args} variant="primary" />
      <AppButton {...args} variant="secondary" />
    </>
  ),
};

export const FullWidth: Story = {
  args: {
    width: "full",
  },

  render: args => (
    <>
      <AppButton {...args} variant="primary" />
      <AppButton {...args} variant="secondary" />
    </>
  ),
};

export const WithLoadingState: Story = {
  args: {
    isLoading: true,
  },

  render: args => (
    <>
      <AppButton {...args} variant="primary" />
      <AppButton {...args} variant="secondary" />
    </>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },

  render: args => (
    <>
      <AppButton {...args} variant="primary" />
      <AppButton {...args} variant="secondary" />
    </>
  ),
};

export const WithStartAdornment: Story = {
  render: args => (
    <>
      <AppButton
        {...args}
        startAdornment={<Heart fill={APP_COLORS.secondary} />}
        variant="primary"
      />
      <AppButton {...args} startAdornment={<Heart />} variant="secondary" />
    </>
  ),
};

export const WithEndAdornment: Story = {
  render: args => (
    <>
      <AppButton
        {...args}
        endAdornment={<Heart fill={APP_COLORS.secondary} />}
        variant="primary"
      />
      <AppButton {...args} endAdornment={<Heart />} variant="secondary" />
    </>
  ),
};

export const DifferentTag: Story = {
  args: {
    size: "lg",
    width: "full",
    isLoading: true,
    disabled: true,
  },
};
