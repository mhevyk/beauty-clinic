import Typography from "@mui/material/Typography";

import { CartDrawerFooterStyled } from "@/containers/drawers/cart-drawer/components/CartDrawerFooter/CartDrawerFooter.styled";

type CartDrawerFooterProps = {
  totalPrice: number;
};

export default function CartDrawerFooter({
  totalPrice,
}: CartDrawerFooterProps) {
  return (
    <CartDrawerFooterStyled>
      <Typography>Total price: </Typography>
      <Typography variant="heading" fontSize="16px">
        ${totalPrice}
      </Typography>
    </CartDrawerFooterStyled>
  );
}
