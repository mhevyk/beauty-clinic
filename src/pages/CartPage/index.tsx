import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

import { styled } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import CartCheckoutBar from "@/pages/CartPage/components/CartCheckoutBar.tsx";
import CartItemCard from "@/pages/CartPage/components/CartItemCard";
import { useCartStore } from "@/store/cart/cartStore";
import theme from "@/theme/theme.ts";

const SectionStyled = styled("section")({
  backgroundColor: theme.palette.PinkMarbleSky.main,
  display: "flex",
  justifyContent: "center",
});

const ContainerStyled = styled(Box)({
  maxWidth: "940px",
  width: "100%",
  margin: "140px 10px 48px 10px",
});

const LinkStyled = styled(Link)({
  textDecoration: "underline",
  fontSize: "15px",
});

const BoxStyled = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "410px",
});

export default function CartPage() {
  const cartItems = useCartStore(store => store.getItems());

  return (
    <SectionStyled>
      <ContainerStyled>
        <Typography fontSize="20px" margin="16px 0">
          My cart
        </Typography>
        <Divider color="#c7bdb5" />
        {cartItems.length === 0 ? (
          <BoxStyled>
            <Typography fontSize="22px">Cart is empty</Typography>
            <LinkStyled to="/treatments">Continue Browsing</LinkStyled>
          </BoxStyled>
        ) : (
          <Box>
            {cartItems.map(item => (
              <Fragment key={item.treatment.id}>
                <CartItemCard item={item} />
              </Fragment>
            ))}
          </Box>
        )}
        <CartCheckoutBar />
      </ContainerStyled>
    </SectionStyled>
  );
}
