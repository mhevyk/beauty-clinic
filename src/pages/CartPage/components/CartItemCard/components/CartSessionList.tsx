import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

import CartSession from "@/pages/CartPage/components/CartItemCard/components/CartSession.tsx";
import { CartSession as CartSessionType } from "@/store/cart/cartStore.ts";
import { Treatment } from "@api/hooks";

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
