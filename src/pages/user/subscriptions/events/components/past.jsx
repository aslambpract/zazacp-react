import useFetchEvents from "../hooks/useFetchEvents";
import EventCard from "./eventCard";

const Past = ({ isPublic }) => {
  const past = useFetchEvents("past", isPublic);

  return <EventCard {...past} />;
};

export default Past;
