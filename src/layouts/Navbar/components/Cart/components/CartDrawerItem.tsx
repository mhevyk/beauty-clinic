import {
  Avatar,
  Fade,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  alpha,
  styled,
} from "@mui/material";
import { CartItemWithMultipleSessions } from "@store/cart/cartStore";
import concatUrls from "@utils/concatUrls";
import { useState } from "react";
import { Link } from "react-router-dom";

const ListItemStyled = styled(ListItem)({
  position: "relative",
});

const OverlayLink = styled(Link)(({ theme }) => ({
  opacity: 0,
  transition: "all 600ms",
  content: "'Go to cart'",
  position: "absolute",
  inset: 0,
  zIndex: 10,
  width: "100%",
  height: "100%",
  backgroundColor: alpha(theme.palette.secondary.main, 0.65),
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  paddingLeft: "16px",
  paddingRight: "24px",
}));

type CartDrawerItemProps = {
  item: CartItemWithMultipleSessions;
};

// TODO: change UI, waiting for design
export default function CartDrawerItem({ item }: CartDrawerItemProps) {
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
        <OverlayLink to="/cart">
          <Typography color="white">Go to cart</Typography>
        </OverlayLink>
      </Fade>
    </ListItemStyled>
  );
}
