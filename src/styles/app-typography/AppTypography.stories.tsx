import type { Meta, StoryObj } from "@storybook/react";

import AppTypography, {
  AppTypographyProps,
} from "@/styles/app-typography/AppTypography";

const meta: Meta<AppTypographyProps> = {
  title: "AppTypography",
  component: AppTypography,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<AppTypographyProps>;

export const Paragraph: Story = {
  args: {
    children: "Paragraph",
  },
  render: (props: AppTypographyProps) => <AppTypography {...props} />,
};
