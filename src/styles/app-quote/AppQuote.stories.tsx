import { Meta, StoryObj } from "@storybook/react";

import AppQuote from "@/styles/app-quote/AppQuote";
import { AppQuoteProps } from "@/styles/app-quote/AppQuote.types";

const meta: Meta<AppQuoteProps> = {
  title: "AppQuote",
  component: AppQuote,
  tags: ["autodocs"],
  args: {
    children:
      "Do you have a design in mind for your blog? Whether you prefer a trendy postcard look or you’re going for a more editorial style blog - there’s a stunning layout for everyone. ",
  },
  decorators: Story => {
    return (
      <div style={{ maxWidth: "500px" }}>
        <Story />
      </div>
    );
  },
};

export default meta;

type Story = StoryObj<AppQuoteProps>;

export const Default: Story = {};
