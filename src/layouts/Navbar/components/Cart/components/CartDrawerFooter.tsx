import { Box, Typography, styled } from "@mui/material";

const CartFooter = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.SteelMist.main,
  marginTop: "40px",
  padding: "20px 24px",
  display: "flex",
  justifyContent: "space-between",
}));

type CartDrawerFooterProps = {
  totalPrice: number;
};

export default function CartDrawerFooter({
  totalPrice,
}: CartDrawerFooterProps) {
  return (
    <CartFooter>
      <Typography>Total price: </Typography>
      <Typography variant="heading" fontSize="16px">
        ${totalPrice}
      </Typography>
    </CartFooter>
  );
}
