//This is the page that shows all the signup information for a specific trip
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useFetch } from "../Pages/useFetch";
import Axios from "axios";
import { Link } from "react-router-dom";

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
          {event.tripName} Trip Signup Information
        </h1>
        {signups.map((signup) => (
          <li key={signup.vunet_ID}>
            <h1 className="text-xl pt-2 font-bold">
              Student Name/Pronouns: {signup.name_pronouns}
            </h1>
            <p>Phone Number: {signup.phone_number}</p>
            <p>Signup Time: {signup.signup_time}</p>
            <p>Earliest Depart Time: {signup.earliest_depart_time}</p>
            <p>Allergies: {signup.allergies_dietary}</p>
            <p>Missings Items: {signup.missing_items}</p>
            <p>Comments & Questions: {signup.comments_questions}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TripSignup;
