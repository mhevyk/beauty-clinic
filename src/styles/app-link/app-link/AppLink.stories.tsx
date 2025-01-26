import { Meta, StoryObj } from "@storybook/react";
import { CSSProperties } from "react";
import { MemoryRouter } from "react-router-dom";

import { APP_COLORS } from "@/styles";
import AppLink from "@/styles/app-link/app-link/AppLink";
import { AppLinkProps } from "@/styles/app-link/app-link/AppLink.types";
import AppTypography from "@/styles/app-typography/AppTypography";

const meta: Meta<AppLinkProps> = {
  title: "AppLink/AppPlainLink",
  component: AppLink,
  tags: ["autodocs"],
  args: {
    to: "/",
    children: "Link",
  },
  decorators: Story => {
    return (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    );
  },
};

export default meta;

type Story = StoryObj<AppLinkProps>;

export const Default: Story = {};

const cardStyle = {
  maxWidth: "250px",
  minHeight: "100px",
  borderRadius: "20px",
  border: `1px solid ${APP_COLORS.muted}`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "20px",
  boxSizing: "border-box",
} as CSSProperties;

export const WrapperLink: Story = {
  render: () => {
    return (
      <AppLink to="/">
        <div style={cardStyle}>
          <AppTypography variant="h4">Link card</AppTypography>
          <AppTypography variant="caption">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat,
            adipisci? Voluptate dicta obcaecati.
          </AppTypography>
        </div>
      </AppLink>
    );
  },
};

export const Faded: Story = {
  args: {
    variant: "faded",
  },
};

export const Plain: Story = {
  args: {
    variant: "plain",
  },
};

export const Accent: Story = {
  args: {
    variant: "accent",
  },
};

export const WithCustomTypography: Story = {
  render: ({ children, ...args }) => (
    <AppLink {...args}>
      <AppTypography variant="h5">{children}</AppTypography>
    </AppLink>
  ),
};
