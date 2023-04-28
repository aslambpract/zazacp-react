import { TableCell, TableRow } from "@mui/material";

const Row = ({ data, rowNumber }) => {
  const { id, fromuser, payment_type, total_amount, created_at } = data;
  return (
    <TableRow key={id}>
      <TableCell>{rowNumber}</TableCell>
      <TableCell>{fromuser.username}</TableCell>
      <TableCell>{payment_type}</TableCell>
      <TableCell>{total_amount}</TableCell>
      <TableCell>{new Date(created_at).toLocaleDateString("en-GB")}</TableCell>
    </TableRow>
  );
};

export default Row;
