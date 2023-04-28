import React from "react";
// @mui
import { Box, Card, Grid, Typography, Button, Stack } from "@mui/material";

// components
import DatesCard from "./dates";
import TicketAbout from "./about";
import ReplyInput from "./reply/replyInput";
import ReplyForm from "./reply/replyForm";
import ReplyList from "./reply/replyList";
import TicketButton from "./buttonsTickets";

const index = () => {
  return (
    <>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={10}>
            <Typography>
              Ticket ID : <b>SHIBI786212289</b>
            </Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <TicketButton />
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <DatesCard />
              <TicketAbout />
            </Stack>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              <ReplyList />
              <ReplyForm />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default index;
