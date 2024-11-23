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

export const Body: Story = {
  args: {
    variant: "body",
  },
};

export const Caption: Story = {
  args: {
    variant: "caption",
  },
};

export const Accent: Story = {
  args: {
    variant: "accent",
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
    underlined: true,
  },
};

export const MultipleFormats: Story = {
  args: {
    fontWeight: "bold",
    oblique: true,
    underlined: true,
  },
};

export const Inline: Story = {
  args: {
    inline: true,
  },
};

export const DifferentTag: Story = {
  args: {
    variant: "subtitle",
    as: "h3",
  },
};
