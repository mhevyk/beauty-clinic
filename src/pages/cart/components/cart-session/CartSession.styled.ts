import { styled } from "@mui/material";
import TableCell from "@mui/material/TableCell";

import BinIcon from "@/assets/icons/bin-icon.svg";

export const BinButton = styled(BinIcon)({
  width: "25px",
  height: "27px",
});

export const TableCellStyled = styled(TableCell)({
  border: "none",
  padding: "6px 0",
});

export const SessionDescription = styled("p")(({ theme }) => ({
  ...theme.typography.paragraph,
  fontSize: "18px",
  padding: "0 6px",
  margin: 0,
}));
