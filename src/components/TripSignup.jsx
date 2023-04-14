//This is the page that shows all the signup information for a specific trip
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useFetch } from "../Pages/useFetch";
import Axios from "axios";
import { Link } from "react-router-dom";
import SignupCard from "./SignupCard";

const TripSignup = () => {
  const { id } = useParams();
  const { data: signups } = useFetch(
    `https://wilskill-app.herokuapp.com/signups/getsignup/${id}`
  );
  const { data: event } = useFetch(
    `https://wilskill-app.herokuapp.com/trips/gettrip/${id}`
  );

  return (
    <div className="text-center">
      <h1 className="pt-2"></h1>
      <ul>
        <h1 className="text-3xl pt-2 font-bold">
          {event.tripName} Trip Signups
        </h1>
        <br></br>
        {signups.map((signup) => (
            <li key={signup.email + signup.signup_time}>
            <SignupCard user={signup}></SignupCard>
            </li>
        ))}
      </ul>
      <button className="event-button bg-[#FDCB6E] hover:bg-[#9e7f44] text-black font-bold py-4 px-4 rounded-full">
                Copy Selected Emails  
      </button>
      <Link to={`/events/${id}`}>
        <button className="backButton" variant="primary" type="button">
              Back
        </button>
      </Link>
    </div>
  );
};

export default TripSignup;
