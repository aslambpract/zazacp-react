// @mui
import { Box, Chip, Grid, Stack } from "@mui/material";

// components
import TicketAbout from "./about";
import DatesCard from "./dates";
import useFetchTicketView from "./hooks/useFetchTicketView";
import ReplyForm from "./reply/replyForm";
import ReplyList from "./reply/replyList";

const Index = () => {
  const { data, fetchData } = useFetchTicketView();
  console.log(data);
  return (
    <>
      <Box sx={{ p: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={10}>
            <Chip
              label={
                <>
                  Ticket ID : <b>{data.ticket_number}</b>
                </>
              }
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={2}>
            {/* <TicketButton /> */}
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <DatesCard data={data} />
              <TicketAbout data={data} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              <ReplyList data={data} />
              <ReplyForm reload={fetchData} />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Index;
