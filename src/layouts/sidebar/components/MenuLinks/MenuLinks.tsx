import { Typography } from "@mui/material";

import {
  MenuLink,
  MenuWrapper,
} from "@/layouts/sidebar/components/MenuLinks/MenuLinks.styled";
import { menuItems } from "@/layouts/sidebar/data/menuItems";

type MenuLinksProps = {
  onClose: () => void;
};

export default function MenuLinks({ onClose }: MenuLinksProps) {
  return (
    <MenuWrapper>
      {menuItems.map((menuItem, index) => (
        <Typography
          fontSize="30px"
          variant="heading"
          component="li"
          key={index}
        >
          <MenuLink onClick={onClose} to={menuItem.path}>
            {menuItem.label}
          </MenuLink>
        </Typography>
      ))}
    </MenuWrapper>
  );
}
