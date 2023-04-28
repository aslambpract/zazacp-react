import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import PaginationButtons from "src/components/pagination";
import usePagination from "src/components/pagination/usePagination";
import Scrollbar from "src/components/Scrollbar";
import axiosInstance from "src/utils/axios";
import Actions from "./Actions";
import eventsRow from "./eventsRow";
import TableMenu from "./tableMenu";
import useLocales from "src/hooks/useLocales";

const EventsList = () => {
  const { translate } = useLocales();
  const [eventsList, setEventsList] = useState([]);
  const [eventId, setEventId] = useState(null);
  const { count, onChange, page, rowStart, seed } = usePagination();

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (id) => (event) => {
    setOpenMenuActions(event.currentTarget);
    setEventId(id);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const fetchEventsList = async (page = 1) => {
    try {
      const { data } = await axiosInstance.get(
        `/api/admin/events?page=${page}`
      );
      const { status, data: events } = data;
      if (status) {
        const { data: list, last_page, from } = events;
        seed(last_page, from);
        setEventsList(list);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEventsList(page);
  }, [page]);

  return (
    <div>
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell> {translate("adminStore.events.no")} </TableCell>
                <TableCell> {translate("adminStore.events.image")}  </TableCell>
                <TableCell> {translate("adminStore.events.product")}</TableCell>
                <TableCell> {translate("adminStore.events.eventsType")}</TableCell>
                <TableCell> {translate("adminStore.events.scope")} </TableCell>
                <TableCell> URL </TableCell>
                <TableCell> {translate("adminStore.events.zoomPassword")} </TableCell>
                <TableCell> {translate("adminStore.events.from")} </TableCell>
                {/* <TableCell>Repeat Every</TableCell> */}
                <TableCell> {translate("adminStore.events.time")} </TableCell>
                <TableCell> {translate("adminStore.events.duration")}</TableCell>
                <TableCell> {translate("adminStore.events.host")}</TableCell>
                <TableCell> {translate("adminStore.events.topic")}</TableCell>
                <TableCell> {translate("adminStore.events.action")}</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {eventsList.map(eventsRow(handleOpenMenu, rowStart))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <TableMenu onClose={handleCloseMenu} open={openMenu}>
        <Actions
          eventId={eventId}
          fetchEventsList={fetchEventsList}
          close={handleCloseMenu}
        />
      </TableMenu>
      <PaginationButtons count={count} onChange={onChange} page={page} />
    </div>
  );
};

export default EventsList;
