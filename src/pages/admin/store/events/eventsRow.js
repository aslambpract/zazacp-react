import { IconButton, TableCell, TableRow } from "@mui/material";
import Iconify from "src/components/Iconify";

const eventsRow =
  (handleOpenMenu, row) =>
  (
    {
      id,
      image,
      event_type,
      location_zoom_url,
      zoom_password,
      duration,
      host,
      topic,
      access_scope,
      date_time,
      product,
    },
    i
  ) => {
    const [date, time] = date_time.split(" ");
    return (
      <TableRow key={id}>
        <TableCell>{i + row}</TableCell>
        <TableCell>
          <img src={image} width="100px" />
        </TableCell>
        <TableCell>{product?.name ?? "_"}</TableCell>
        <TableCell>{event_type}</TableCell>
        <TableCell>{access_scope}</TableCell>
        <TableCell>{location_zoom_url}</TableCell>
        <TableCell>{zoom_password}</TableCell>
        <TableCell>{date}</TableCell>
        <TableCell>{time}</TableCell>
        <TableCell>{duration}</TableCell>
        <TableCell>{host}</TableCell>
        <TableCell>{topic}</TableCell>
        <TableCell>
          <IconButton onClick={handleOpenMenu(id)}>
            <Iconify icon={"eva:more-vertical-fill"} width={20} height={20} />
          </IconButton>
        </TableCell>
      </TableRow>
    );
  };

export default eventsRow;
