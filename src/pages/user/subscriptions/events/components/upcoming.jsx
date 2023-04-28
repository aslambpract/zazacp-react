import useFetchEvents from "../hooks/useFetchEvents";
import EventCard from "./eventCard";

const Upcoming = ({ isPublic }) => {
  const upcoming = useFetchEvents("upcoming", isPublic);

  return <EventCard {...upcoming} />;
};

export default Upcoming;
