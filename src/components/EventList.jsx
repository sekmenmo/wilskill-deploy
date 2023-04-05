import { Link } from "react-router-dom";
import { useFetch } from "../Pages/useFetch";
import { UserAuth } from "../context/AuthContext";

const EventList = ({ events, title }) => {
  const { user } = UserAuth();
  const firebase_ID = user.uid;
  const { data: admin } = useFetch(
    `https://wilskill-app.herokuapp.com/admin/isAdmin/${firebase_ID}`
  );

  let hasAdminAccess = 0;
  admin.map((admin) => (hasAdminAccess = admin.isAdmin));
  if (hasAdminAccess === 1)
    return (
      <div>
        <div>
          <h1 className="event-list-title text-2xl font-bold">{title}</h1>
          <Link to="/create">
            <button className="event-button bg-[#FDCB6E] hover:bg-[#9e7f44] text-black font-bold py-4 px-4 rounded-full float-right">
              Create New Trip
            </button>
          </Link>
        </div>
        <div className="list-preview">
          {events.map((event) => (
            <div className="event-preview" key={event.ID}>
              <Link to={`/events/${event.ID}`}>
                <h1 className="text-xl font-bold">{event.tripName}</h1>
                <p>Location: {event.location}</p>
                <p>Trip Type: {event.tripType}</p>
                <p>
                  Dates: {new Date(event.leaveDate).toLocaleDateString()}-
                  {new Date(event.returnDate).toLocaleDateString()}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
  else
    return (
      <div>
        <div>
          <h1 className="event-list-title text-2xl font-bold">{title}</h1>
        </div>
        <div className="list-preview">
          {events.map((event) => (
            <div className="event-preview" key={event.ID}>
              <Link to={`/events/${event.ID}`}>
                <h1 className="text-xl font-bold">{event.tripName}</h1>
                <p>Location: {event.location}</p>
                <p>Trip Type: {event.tripType}</p>
                <p>
                  Dates: {new Date(event.leaveDate).toLocaleDateString()}-
                  {new Date(event.returnDate).toLocaleDateString()}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    );
};

export default EventList;
