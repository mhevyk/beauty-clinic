import { Meta, StoryObj } from "@storybook/react";

import AppButton from "@/styles/app-button/AppButton";
import { AppButtonProps } from "@/styles/app-button/AppButton.types";
import Heart from "@/assets/icons/heart.svg"

const meta: Meta<AppButtonProps> = {
  title: "AppButton",
  component: AppButton,
  tags: ["autodocs"],
  args: { children: "Button" },
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
    fullWidth: true,
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
export const Flex: Story = {
  args: {
    inline: false,
  },

  render: args => (
    <>
      <AppButton {...args} variant="primary" />
      <AppButton {...args} variant="secondary" />
    </>
  ),
};
export const WithPrefixIcon: Story = {
  render: args => (
    <>
      <AppButton {...args} prefixIcon={<Heart fill="#fff" />} variant="primary" />
      <AppButton {...args} prefixIcon={<Heart />} variant="secondary" />
    </>
  ),
};
export const WithIcon: Story = {
  render: args => (
    <>
      <AppButton {...args} icon={<Heart fill="#fff" />} variant="primary" />
      <AppButton {...args} icon={<Heart />} variant="secondary" />
    </>
  ),
};
export const DifferentTag: Story = {
  args: {
    size: "lg",
    fullWidth: true,
    isLoading: true,
    disabled: true,
  },
};
