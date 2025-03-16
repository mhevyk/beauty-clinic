import { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";

import AppNavLink from "@/styles/app-link/app-nav-link/AppNavLink";
import { AppNavLinkProps } from "@/styles/app-link/app-nav-link/AppNavLink.types";
import { AppTypographyVariant } from "@/styles/app-typography/AppTypography.types";

const meta: Meta<AppNavLinkProps> = {
  title: "AppLink/AppNavLink",
  component: AppNavLink,
  tags: ["autodocs"],
  args: {
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

type Story = StoryObj<AppNavLinkProps>;

export const Default: Story = {};

const links = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/shop",
    label: "Shop",
  },
  {
    href: "/contacts",
    label: "Contacts",
  },
];

type NavigationExampleProps = {
  linkVariant?: AppNavLinkProps["variant"];
  typographyVariant?: AppTypographyVariant;
};

const NavigationExample = ({
  linkVariant,
  typographyVariant,
}: NavigationExampleProps) => {
  return (
    <nav>
      <ul
        style={{
          display: "flex",
          gap: "20px",
          listStyle: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {links.map(link => (
          <li key={link.label}>
            <AppNavLink
              to={link.href}
              variant={linkVariant}
              typographyVariant={typographyVariant}
            >
              {link.label}
            </AppNavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export const FadedLinks: Story = {
  render: () => <NavigationExample linkVariant="faded" />,
};

export const AccentLinks: Story = {
  render: () => <NavigationExample linkVariant="accent" />,
};

export const CustomTypographyLinks: Story = {
  render: () => <NavigationExample typographyVariant="h4" />,
};
