import type { Meta, StoryObj } from "@storybook/react";

import AppTypography from "@/styles/app-typography/AppTypography";
import { AppTypographyProps } from "@/styles/app-typography/AppTypography.types";

const meta: Meta<AppTypographyProps> = {
  title: "AppTypography",
  component: AppTypography,
  tags: ["autodocs"],
  args: {
    children: "Typography",
  },
};

export default meta;

type Story = StoryObj<AppTypographyProps>;

export const Default: Story = {};

export const Heading1: Story = {
  args: {
    variant: "h1",
  },
};

export const Heading2: Story = {
  args: {
    variant: "h2",
  },
};

export const Heading3: Story = {
  args: {
    variant: "h3",
  },
};

export const Heading4: Story = {
  args: {
    variant: "h4",
  },
};

export const Heading5: Story = {
  args: {
    variant: "h5",
  },
};

export const Heading6: Story = {
  args: {
    variant: "h6",
  },
};

export const Subtitle: Story = {
  args: {
    variant: "subtitle",
  },
};

export const SubtitleSmall: Story = {
  args: {
    variant: "subtitle-small",
  },
};

export const Concept: Story = {
  args: {
    variant: "concept",
  },
};

export const Accent: Story = {
  args: {
    children:
      "Accent paragraph - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    variant: "accent",
  },
};

export const Body: Story = {
  args: {
    children:
      "Body paragraph - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    variant: "body",
  },
};

export const Caption: Story = {
  args: {
    children:
      "Caption paragraph - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    variant: "caption",
  },
};

export const Bold: Story = {
  args: {
    fontWeight: "bold",
  },
};

export const Oblique: Story = {
  args: {
    oblique: true,
  },
};

export const Underlined: Story = {
  args: {
    underline: true,
  },
};

export const MultipleFormats: Story = {
  args: {
    fontWeight: "bold",
    oblique: true,
    underline: true,
  },
};

export const MultipleBlocks: Story = {
  render: args => (
    <>
      <AppTypography {...args} />
      <AppTypography {...args} />
      <AppTypography {...args} />
    </>
  ),
};

export const MultipleInline: Story = {
  args: {
    inline: true,
  },
  render: args => (
    <>
      <AppTypography {...args} />
      <AppTypography {...args} />
      <AppTypography {...args} />
    </>
  ),
};

export const CombineTypography: Story = {
  render: () => (
    <>
      <AppTypography variant="h5">Heading</AppTypography>
      <AppTypography>
        This is my text and this is{" "}
        <AppTypography fontWeight="bold">bold</AppTypography>
      </AppTypography>
    </>
  ),
};

export const DifferentTag: Story = {
  args: {
    variant: "subtitle",
    as: "h3",
  },
};
