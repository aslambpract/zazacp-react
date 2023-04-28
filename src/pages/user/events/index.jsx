import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { sentenceCase } from "change-case";
import React from "react";
import HeaderBreadcrumbs from "src/components/HeaderBreadcrumbs";
import Page from "src/components/Page";
import { PATH_USER } from "src/routes/paths";
import useAllEvents from "../dashboard/new/componets/list/hooks/useAllEvents";
import useLocales from "src/hooks/useLocales";


const Events = () => {
  const { translate } = useLocales();
  const events = useAllEvents();
  return (
    <Page title= {translate("userEvents.events")}>
      <HeaderBreadcrumbs
        heading= {translate("userEvents.productDetails")}
        links={[
          { name: translate("dashboard"), href: PATH_USER.user_dashboard },
          { name:translate("userEvents.events") },
        ]}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{translate("userEvents.topic")}</TableCell>
              <TableCell>{translate("userEvents.image")}</TableCell>
              <TableCell align="right">{translate("userEvents.host")}</TableCell>
              <TableCell align="right">{translate("userEvents.accessScope")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map(({ id, access_scope, topic, host, image }) => (
              <TableRow
                key={id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {topic}
                </TableCell>
                <TableCell component="th" scope="row">
                  <img width={50} src={image} />
                </TableCell>
                <TableCell align="right">{host}</TableCell>
                <TableCell align="right">{access_scope}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Page>
  );
};

export default Events;
