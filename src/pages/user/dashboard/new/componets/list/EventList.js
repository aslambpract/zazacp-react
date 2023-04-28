import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { Box, CardContent, Typography } from "@mui/material";
import PropTypes from "prop-types";

export default function EventList({ events, date = new Date() }) {
  const dateString = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const day = date.toLocaleDateString("en-GB", { weekday: "long" });
  return (
    <Box
      sx={{
        "& .MuiTimelineItem-missingOppositeContent:before": {
          display: "none",
        },
      }}
    >
      <CardContent>
        <Typography variant="subtitle2">
          {day} &nbsp;&nbsp;
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {dateString}
          </Typography>
        </Typography>
        <Timeline>
          {events?.map((item, index) => (
            <EventsCard
              key={item.id}
              item={item}
              isLast={index === events.length - 1}
            />
          ))}
        </Timeline>
      </CardContent>
    </Box>
  );
}

EventsCard.propTypes = {
  isLast: PropTypes.bool,
  item: PropTypes.shape({
    time: PropTypes.instanceOf(Date),
    title: PropTypes.string,
    type: PropTypes.string,
  }),
};

function EventsCard({ item, isLast }) {
  const { topic: title, date_time } = item;
  const time = new Date(date_time)
    .toLocaleDateString("en-GB")
    .replaceAll("/", "-");

  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot color="primary" />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {time}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
