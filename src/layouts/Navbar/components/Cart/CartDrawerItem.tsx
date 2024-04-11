import { Box, Button, Typography } from "@mui/material";
import {
  CartItemWithMultipleSessions,
  useCartStore,
} from "@store/cart/cartStore";

type CartDrawerItemProps = {
  item: CartItemWithMultipleSessions;
};

// TODO: change UI, waiting for design
export default function CartDrawerItem({ item }: CartDrawerItemProps) {
  const removeFromCart = useCartStore((store) => store.removeFromCart);

  return (
    <Box component="article" sx={{padding: '10px 0'}}>
      <Typography sx={{ backgroundColor: "pink" }}>
        [{item.treatment.name}] {item.treatment.pricePerUnit}
      </Typography>
      {item.sessions.map((session) => (
        <Box
          key={`${item.treatment.id}-${session.id}`}
          sx={{ border: "1px solid red" }}
        >
          <Typography>
            {session.employee.name} {session.time.start.toLocaleTimeString()} -{" "}
            {session.time.end.toLocaleTimeString()}
          </Typography>
          <Button
            variant="primary"
            onClick={() => removeFromCart(item.treatment.id, session.id)}
            size="small"
          >
            Remove from cart
          </Button>
        </Box>
      ))}
    </Box>
  );
}
