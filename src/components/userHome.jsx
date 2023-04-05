import EventList from "./EventList";
import { useFetch } from "../Pages/useFetch";

const UserHome = () => {
  const { data: events } = useFetch(
    "https://wilskill-app.herokuapp.com/trips/get"
  );

  return (
    <div>
      {events && <EventList events={events} title={"All Available Events"} />}
    </div>
  );
};

export default UserHome;
