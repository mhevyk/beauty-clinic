import { useCartStore } from "@store/cart/cartStore";
import { Box, Divider, Typography, styled } from "@mui/material";
import theme from "@theme/theme.ts";
import { Fragment } from "react/jsx-runtime";
import CartItemCard from "@pages/CartPage/components/CartItemCard";

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

export default function CartPage() {
  const cartItems = useCartStore((store) => store.getItems());

  return (
    <SectionStyled>
      <ContainerStyled>
        <Typography fontSize="20px" margin="16px 0">
          My cart
        </Typography>
        <Divider color="#c7bdb5" />
        {cartItems.length === 0 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="410px"
          >
            <Typography fontSize="22px">Cart is empty</Typography>
            {/*TODO: add link*/}
          </Box>
        ) : (
          <Box>
            {cartItems.map((item) => (
              <Fragment key={item.treatment.id}>
                <CartItemCard item={item} />
              </Fragment>
            ))}
          </Box>
        )}
        <Divider color="#c7bdb5" />
      </ContainerStyled>
    </SectionStyled>
  );
}
