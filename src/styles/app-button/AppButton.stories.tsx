import { Meta, StoryObj } from "@storybook/react";

import AppButton from "@/styles/app-button/AppButton";
import { AppButtonProps } from "@/styles/app-button/AppButton.types";
import Heart from "@/assets/icons/heart.svg"
import MapPin from "@/assets/icons/map-pin.svg"

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
      <br />
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
      <br />
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
      <br />
      <AppButton {...args} variant="secondary" />
    </>
  ),
};
export const Full: Story = {
  args: {
    fullWidth: true,
  },

  render: args => (
    <>
      <AppButton {...args} variant="primary" />
      <br />
      <AppButton {...args} variant="secondary" />
    </>
  ),
};
export const Loading: Story = {
  args: {
    isLoading: true,
  },

  render: args => (
    <>
      <AppButton {...args} variant="primary" />
      <br />
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
      <br />
      <AppButton {...args} variant="secondary" />
    </>
  ),
};
export const Inline: Story = {
  args: {
    inline: true,
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
      <AppButton {...args} prefixIcon={MapPin} variant="primary" />
      <AppButton {...args} prefixIcon={Heart} variant="secondary" />
    </>
  ),
};
export const WithSufixIcon: Story = {
  render: args => (
    <>
      <AppButton {...args} postfixIcon={MapPin} variant="primary" />
      <AppButton {...args} postfixIcon={Heart} variant="secondary" />
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
