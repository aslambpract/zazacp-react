import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import LabeledPaper from "src/components/LabeledPaper";
import Scrollbar from "src/components/Scrollbar";
import EventList from "../../new/componets/list/EventList";
import "./calender.css";
import useEvents from "./hooks/useEvents";
import useLocales from "src/hooks/useLocales";

const Events = () => {
  const { translate } = useLocales();
  const { onChange, onMonthChange, value, events } = useEvents();
  const [todaysEvents, setTodaysEvents] = useState([]);
  useEffect(() => {
    const valueInMilliseconds = value.getTime();
    const filteredEvents = events.filter((event) => {
      return new Date(event.date_time).getTime() === valueInMilliseconds;
    });
    setTodaysEvents(filteredEvents);
  }, [value]);

  return (
    <>
      <LabeledPaper label={translate("userDashboard.eventsCalendar")}>
        <Box
          sx={{
            display: "grid",
            rowGap: 3,
            columnGap: 2,
            marginTop: 3,
            gridTemplateColumns: {
              xs: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
            },
          }}
        >
          <Box sx={{ marginTop: "0.5rem" }}>
            <Calendar
              onActiveStartDateChange={onMonthChange}
              showNeighboringMonth={false}
              defaultValue={value}
              value={value}
              className="custom__calender"
              onChange={onChange}
            />
          </Box>
          <Scrollbar>
            <EventList events={todaysEvents} date={value} />
          </Scrollbar>
        </Box>
      </LabeledPaper>
    </>
  );
};

export default Events;
