import { useState } from "react";

import Avatar from "@mui/material/Avatar";
import Fade from "@mui/material/Fade";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import {
  ListItemStyled,
  OverlayLink,
} from "@/containers/drawers/cart-drawer/components/CartDrawerItem/CartDrawerItem.styled";
import { CartItem } from "@/store/cart/cartStore";
import concatUrls from "@/utils/concat-urls/concatUrls";

type CartDrawerItemProps = {
  item: CartItem;
  closeCartDrawer: () => void;
};

// TODO: change UI, waiting for design
export default function CartDrawerItem({
  item,
  closeCartDrawer,
}: CartDrawerItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  const { treatment, sessions } = item;
  const treatmentImage = treatment.imageUrl
    ? concatUrls(import.meta.env.VITE_API_BASE_IMAGE_URL, treatment.imageUrl)
    : undefined;

  return (
    <ListItemStyled
      alignItems="flex-start"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ListItemAvatar>
        <Avatar alt={`${treatment.name} image`} src={treatmentImage}>
          {!treatmentImage && treatment.name[0]}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={<Typography fontWeight="bold">{treatment.name}</Typography>}
        secondary={
          <>
            <Typography fontSize="15px">Sessions: {sessions.length}</Typography>
            <Typography fontSize="15px" marginLeft="auto">
              ${treatment.pricePerUnit}
            </Typography>
          </>
        }
        secondaryTypographyProps={{
          sx: {
            display: "flex",
            justifyContent: "space-between",
          },
        }}
      />
      <Fade in={isHovered} timeout={500}>
        <OverlayLink to="/cart" onClick={closeCartDrawer}>
          <Typography color="white">Go to cart</Typography>
        </OverlayLink>
      </Fade>
    </ListItemStyled>
  );
}
