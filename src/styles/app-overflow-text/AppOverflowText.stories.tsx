import { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import AppOverflowText from "@/styles/app-overflow-text/AppOverflowText.tsx";
import { AppOverflowTextsProps } from "@/styles/app-overflow-text/AppOverflowText.types.ts";

const meta: Meta<AppOverflowTextsProps> = {
  title: "AppOverflowText",
  component: AppOverflowText,
  tags: ["autodocs"],
  args: {
    children:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque eligendi suscipit accusamus veritatis",
  },
  parameters: {
    layout: "centered",
  },
  decorators: Story => (
    <MemoryRouter>
      <div
        style={{
          padding: "90px",
          display: "flex",
          justifyContent: "center",
          width: "90vh",
        }}
      >
        <Story />
      </div>
    </MemoryRouter>
  ),
};

export default meta;

type Story = StoryObj<AppOverflowTextsProps>;

export const Default: Story = {};

export const TitleSmallSize: Story = {
  args: {
    variant: "h4",
    textSize: "sm",
  },

  render: args => (
    <AppOverflowText {...args}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </AppOverflowText>
  ),
};

export const TextWithoutTooltip: Story = {
  args: {
    variant: "h4",
    textSize: "lg",
  },

  render: args => (
    <AppOverflowText {...args}>Lorem ipsum dolor sit amet</AppOverflowText>
  ),
};

export const LargeTextWithTooltip: Story = {
  args: {
    variant: "h3",
    textSize: "lg",
    tooltipProps: {
      width: "lg",
      position: "bottom",
    },
  },
  parameters: {
    docs: {
      story: {
        height: "250px",
      },
    },
  },

  render: args => (
    <AppOverflowText {...args}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec
      quam id dolor pharetra cursus a nec massa.
    </AppOverflowText>
  ),
};

export const CustomTooltipPosition: Story = {
  args: {
    variant: "h5",
    textSize: "sm",
    tooltipProps: {
      position: "right",
      width: "md",
    },
  },
  parameters: {
    layout: "padded",
  },
  render: args => (
    <AppOverflowText {...args}>
      Lorem ipsu mdolor sit amet cons ectetur adipi sicing elit.
    </AppOverflowText>
  ),
};
