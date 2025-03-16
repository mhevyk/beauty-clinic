import { Meta, StoryObj } from "@storybook/react";

import AppOverflowText from "@/styles/app-overflow-text/AppOverflowText.tsx";
import { AppOverflowTextsProps } from "@/styles/app-overflow-text/AppOverflowText.types.ts";

const meta: Meta<AppOverflowTextsProps<"div">> = {
  title: "AppOverflowText",
  component: AppOverflowText,
  tags: ["autodocs"],
  args: {
    children:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque eligendi",
  },
  parameters: {
    layout: "centered",
  },
  decorators: Story => (
    <div
      style={{
        padding: "90px 150px",
        display: "flex",
        justifyContent: "center",
        width: "300px",
      }}
    >
      <Story />
    </div>
  ),
};

export default meta;

type Story = StoryObj<AppOverflowTextsProps<"div">>;

export const Default: Story = {};

export const WithCustomTypography: Story = {
  args: {
    typographyProps: {
      variant: "h3",
      underline: true,
      oblique: true,
    },
  },
};

export const WithCustomizedTooltip: Story = {
  args: {
    tooltipProps: {
      position: "right",
      width: "md",
    },
  },
  parameters: {
    layout: "padded",
  },
};
