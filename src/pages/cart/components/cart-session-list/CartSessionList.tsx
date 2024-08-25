import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

import { Treatment } from "@/api/generated";
import CartSession from "@/pages/cart/components/cart-session/CartSession";
import { CartSession as CartSessionType } from "@/store/cart/cartStore.ts";

type CartSessionListProps = {
  sessions: CartSessionType[];
  treatment: Treatment;
};

export default function CartSessionList({
  sessions,
  treatment,
}: CartSessionListProps) {
  return (
    <Table>
      <TableBody>
        {sessions.map(item => (
          <CartSession
            key={`${treatment.id}-${item.employee.id}-${item.sessionStartsAt}`}
            session={item}
            treatment={treatment}
          />
        ))}
      </TableBody>
    </Table>
  );
}
