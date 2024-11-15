import { Fragment } from "react/jsx-runtime";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import AppHelmet from "@/components/app-helmet/AppHelmet";
import {
  BoxStyled,
  ContainerStyled,
  LinkStyled,
  SectionStyled,
} from "@/pages/cart/CartPage.styled";
import CartCheckoutBar from "@/pages/cart/components/cart-checkout-bar/CartCheckoutBar";
import CartItemCard from "@/pages/cart/components/cart-item-card/CartItemCard";
import { useCartStore } from "@/store/cart/cartStore.ts";

export default function CartPage() {
  const cartItems = useCartStore(store => store.getItems());

  return (
    <AppHelmet title="My cart">
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
    </AppHelmet>
  );
}
