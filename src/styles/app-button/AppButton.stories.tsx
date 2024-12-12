import { Meta, StoryObj } from "@storybook/react";

import AppButton from "@/styles/app-button/AppButton";
import { AppButtonProps } from "@/styles/app-button/AppButton.types";

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
    full: true,
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
    loading: true,
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
export const DifferentTag: Story = {
  args: {
    as: "span",
    size: "lg",
    full: true,
    loading: true,
    disabled: true,
  },
};
