import { styled } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { format } from "date-fns";

import BinIcon from "@/assets/icons/bin-icon.svg";

import {
  CartSession as CartSessionType,
  useCartStore,
} from "@/store/cart/cartStore.ts";
import minutesToHourAndMinutes from "@/utils/minutesToHourAndMinutes.ts";
import { Treatment } from "@api/hooks";

const BinButton = styled(BinIcon)({
  width: "25px",
  height: "27px",
});

const TableCellStyled = styled(TableCell)({
  border: "none",
  padding: "6px 0",
});

const SessionDescription = styled("p")(({ theme }) => ({
  ...theme.typography.paragraph,
  fontSize: "18px",
  padding: "0 6px",
  margin: 0,
}));

type CartSessionProps = {
  session: CartSessionType;
  treatment: Treatment;
};

export default function CartSession({ session, treatment }: CartSessionProps) {
  const deleteSession = useCartStore(store => store.removeFromCart);

  function handleDeleteSession() {
    deleteSession(treatment.id, {
      sessionStartsAt: session.sessionStartsAt,
      employeeId: session.employee.id,
    });
  }

  return (
    <TableRow>
      <TableCellStyled>
        <SessionDescription>
          {format(session.sessionStartsAt, `MMMM d, yyyy h:mm aaa `)}
        </SessionDescription>
      </TableCellStyled>
      <TableCellStyled>
        <SessionDescription>{session.employee.name}</SessionDescription>
      </TableCellStyled>
      <TableCellStyled>
        <SessionDescription>
          {minutesToHourAndMinutes(treatment.duration)}
        </SessionDescription>
      </TableCellStyled>
      <TableCellStyled>
        <SessionDescription>${treatment.pricePerUnit}</SessionDescription>
      </TableCellStyled>
      <TableCell sx={{ border: "none" }} padding="none">
        <IconButton onClick={handleDeleteSession}>
          <BinButton />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
