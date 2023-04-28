import { IconButton, TableCell, TableRow, Typography } from "@mui/material";

import Iconify from "src/components/Iconify";
import StatusButton from "./StatusButton";

const ticketRow = (handleToggle, handleOpenMenu, rowStart) => (ticket, i) => {
  const {
    id,
    subject,
    status,
    created_at,
    ticket_number,
    support_ticket_priorities,
    support_ticket_departments,
    user,
  } = ticket;
  return (
    <TableRow>
      <TableCell>{i + rowStart}</TableCell>
      <TableCell>{ticket_number}</TableCell>
      <TableCell>{user.username}</TableCell>
      <TableCell>{new Date(created_at).toLocaleDateString("en-GB")}</TableCell>
      <TableCell>{subject}</TableCell>
      <TableCell>
        <StatusButton handleToggle={handleToggle(id)} selectedItem={status} />
      </TableCell>
      <TableCell>
        <Typography style={{ color: support_ticket_priorities.color }}>
          {support_ticket_priorities.name?.toLowerCase()}
        </Typography>
      </TableCell>
      <TableCell>{support_ticket_departments.name}</TableCell>
      <TableCell>
        <IconButton onClick={handleOpenMenu(id, user.id)}>
          <Iconify icon={"eva:more-vertical-fill"} width={20} height={20} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
export default ticketRow;
