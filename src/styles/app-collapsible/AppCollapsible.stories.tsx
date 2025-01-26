import { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import AppCollapsible from "@/styles/app-collapsible/AppCollapsible";
import { AppCollapsibleProps } from "@/styles/app-collapsible/AppCollapsible.types";
import AppTypography from "@/styles/app-typography/AppTypography";

const sharedProps = {
  header: "Header",
  children: (
    <AppTypography>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis,
      laborum error distinctio aliquid excepturi debitis fugit iste nam quas
      vitae placeat fuga repellat, quasi maiores architecto ipsam repudiandae,
      recusandae accusamus!
    </AppTypography>
  ),
};

const meta: Meta<AppCollapsibleProps> = {
  title: "AppCollapsible",
  component: AppCollapsible,
  tags: ["autodocs"],
  args: sharedProps,
  decorators: Story => (
    <div style={{ width: "400px" }}>
      <Story />
    </div>
  ),
  parameters: {
    docs: {
      story: {
        height: "60px",
      },
    },
  },
};

export default meta;

type Story = StoryObj<AppCollapsibleProps>;

export const Default: Story = {};

export const Expanded: Story = {
  args: {
    defaultExpanded: true,
  },
};

export const Uncontrolled: Story = {
  args: {
    defaultExpanded: false,
  },
};

export const Controlled: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false);

    return (
      <AppCollapsible
        {...sharedProps}
        expanded={expanded}
        onExpandedChange={setExpanded}
      />
    );
  },
};
