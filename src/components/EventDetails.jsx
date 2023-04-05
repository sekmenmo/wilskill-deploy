//This is the page that shows details of a specific event and allows users to sign up for that event
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useFetch } from "../Pages/useFetch";
import Axios from "axios";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { UserAuth } from "../context/AuthContext";

const EventDetails = () => {
  const { id } = useParams();
  const { data: event } = useFetch(
    `https://wilskill-app.herokuapp.com/trips/gettrip/${id}`
  );
  const { user } = UserAuth();
  const form = useRef();
  const firebase_ID = user.uid;
  const { data: admin } = useFetch(
    `https://wilskill-app.herokuapp.com/admin/isAdmin/${firebase_ID}`
  );

  const deleteButton = () => {
    Axios.delete(`https://wilskill-app.herokuapp.com/trips/deletetrip/${id}`)
      .then(async (res) => {
        if (res) {
          console.log(res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("Delete completed");
  };

  const [tripID, setTripID] = useState(id);
  const [name_pronouns, setName] = useState("");
  const [email, setEmail] = useState("");
  const [vunetID, setID] = useState("");
  const [phoneNumber, setNumber] = useState("");
  const [earliest_depart_time, setDepartTime] = useState("");
  const [allergies_dietary, setDietary] = useState("");
  const [missing_items, setMissingItem] = useState("");
  const [comments_questions, setComments] = useState("");
  const [disclaimer] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);

    setIsPending(true);

    Axios.post("https://wilskill-app.herokuapp.com/signups/addsignup", {
      tripID: tripID,
      namePronouns: name_pronouns,
      email: email,
      vunetID: vunetID,
      phoneNumber: phoneNumber,
      earliestDepartTime: earliest_depart_time,
      allergiesDietary: allergies_dietary,
      missingItems: missing_items,
      disclaimerAck: disclaimer,
      commentsQs: comments_questions,
    })
      .then(async (res) => {
        if (res) {
          console.log(res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setIsPending(false);
    setName("");
    setEmail("");
    setID("");
    setNumber("");
    setDepartTime("");
    setDietary("");
    setMissingItem("");
    setComments("");
    console.log("Post completed");

    emailjs
      .sendForm(
        "service_h3xc7r2",
        "template_m9v77kt",
        form.current,
        "D8SdKaukyr9iIEiS1"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  let hasAdminAccess = 0;
  admin.map((admin) => (hasAdminAccess = admin.isAdmin));
  if (hasAdminAccess === 1)
    return (
      <div className="event-details">
        {event.map((event) => (
          <div className="text-center" key={event.ID}>
            <h1 className="text-4xl pt-6 font-bold">
              Trip Name: {event.tripName}
            </h1>
            <h1 className="text-xl pt-2 font-bold">
              {event.location}, {event.tripType}
            </h1>
            <h1 className="text-xl pt-2 font-bold">
              {new Date(event.leaveDate).toLocaleDateString()}-
              {new Date(event.returnDate).toLocaleDateString()}
            </h1>
            <h1 className="text-xl pt-2 italic">
              Trip Details: {event.description}
            </h1>
            <h1 className="text-l pt-2 italic pb-3">
              If you have any questions, contact our lead instructor{" "}
              {event.lead_instructor} at {event.instructor_email} or{" "}
              {event.instructor_phone_number}
            </h1>
            <Link to={`/edit-trip/${event.ID}`}>
              <button className="event-button bg-[#FDCB6E] hover:bg-[#9e7f44] text-black font-bold py-4 px-4 rounded-full">
                Update Trip Information
              </button>
            </Link>
            <Link to="/">
              {" "}
              <button
                className="event-button bg-[#FDCB6E] hover:bg-[#9e7f44] text-black font-bold py-4 px-4 rounded-full"
                style={{ marginLeft: ".5rem" }}
                onClick={deleteButton}
              >
                Delete Trip
              </button>
            </Link>
            <Link to={`/view-trip/${event.ID}`}>
              <button className="event-button bg-[#FDCB6E] hover:bg-[#9e7f44] text-black font-bold py-4 px-4 rounded-full">
                View Trip Signup
              </button>
            </Link>
            <h1 className="pt-10"></h1>
            <div className="sign-up">
              <h1 className="text-2xl font-bold pb-4">
                Sign Up for {event.tripName}
              </h1>
              <form onSubmit={handleSubmit} ref={form}>
                <label>Your name and pronouns:</label>
                <input
                  type="text"
                  required
                  value={name_pronouns}
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Your email:</label>
                <input
                  type="text"
                  required
                  value={email}
                  name="to_email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Your VU Net ID:</label>
                <input
                  type="text"
                  required
                  value={vunetID}
                  onChange={(e) => setID(e.target.value)}
                />
                <label>Your phone number (please double check):</label>
                <input
                  type="text"
                  required
                  value={phoneNumber}
                  onChange={(e) => setNumber(e.target.value)}
                />
                <label>What's the earliest possible depart time for you?</label>
                <input
                  type="text"
                  required
                  value={earliest_depart_time}
                  onChange={(e) => setDepartTime(e.target.value)}
                />
                <label>Do you have any dietary restrictions?</label>
                <textarea
                  type="text"
                  required
                  value={allergies_dietary}
                  onChange={(e) => setDietary(e.target.value)}
                ></textarea>
                <label>Do you need any gears/items from Wilskills?</label>
                <textarea
                  type="text"
                  required
                  value={missing_items}
                  onChange={(e) => setMissingItem(e.target.value)}
                ></textarea>
                <label>Do you have any comments or questions? </label>
                <textarea
                  type="text"
                  required
                  value={comments_questions}
                  onChange={(e) => setComments(e.target.value)}
                ></textarea>
                <input type="hidden" name="to_name" value={user.displayName} />
                <input type="hidden" name="to_email" value={user.email} />
                <input type="hidden" name="trip_loc" value={event.location} />
                <input type="hidden" name="trip_name" value={event.tripName} />
                {!isPending && <button className="my-3">Sign Up</button>}
                {isPending && <button disabled>Adding trip...</button>}
              </form>
            </div>
          </div>
        ))}
      </div>
    );
  else
    return (
      <div className="event-details">
        {event.map((event) => (
          <div className="text-center" key={event.ID}>
            <h1 className="text-4xl pt-6 font-bold">
              Trip Name: {event.tripName}
            </h1>
            <h1 className="text-xl pt-2 font-bold">
              {event.location}, {event.tripType}
            </h1>
            <h1 className="text-xl pt-2 font-bold">
              {new Date(event.leaveDate).toLocaleDateString()}-
              {new Date(event.returnDate).toLocaleDateString()}
            </h1>
            <h1 className="text-xl pt-2">Trip Details: {event.description}</h1>
            <h1 className="text-l pt-2 italic pb-3">
              If you have any questions, contact our lead instructor{" "}
              {event.lead_instructor} at {event.instructor_email} or{" "}
              {event.instructor_phone_number}
            </h1>
            <h1 className="pt-10"></h1>
            <div className="sign-up">
              <h1 className="text-2xl font-bold pb-4">
                Sign Up for {event.tripName}
              </h1>

              <form onSubmit={handleSubmit} ref={form}>
                <label>Your name and pronouns:</label>
                <input
                  type="text"
                  required
                  value={name_pronouns}
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Your email:</label>
                <input
                  type="text"
                  required
                  value={email}
                  name="to_email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Your VU Net ID:</label>
                <input
                  type="text"
                  required
                  value={vunetID}
                  onChange={(e) => setID(e.target.value)}
                />
                <label>Your phone number (please double check):</label>
                <input
                  type="text"
                  required
                  value={phoneNumber}
                  onChange={(e) => setNumber(e.target.value)}
                />
                <label>What's the earliest possible depart time for you?</label>
                <input
                  type="text"
                  required
                  value={earliest_depart_time}
                  onChange={(e) => setDepartTime(e.target.value)}
                />
                <label>Do you have any dietary restrictions?</label>
                <textarea
                  type="text"
                  required
                  value={allergies_dietary}
                  onChange={(e) => setDietary(e.target.value)}
                ></textarea>
                <label>Do you need any gears/items from Wilskills?</label>
                <textarea
                  type="text"
                  required
                  value={missing_items}
                  onChange={(e) => setMissingItem(e.target.value)}
                ></textarea>
                <label>Do you have any comments or questions? </label>
                <textarea
                  type="text"
                  required
                  value={comments_questions}
                  onChange={(e) => setComments(e.target.value)}
                ></textarea>
                <input type="hidden" name="to_name" value={user.displayName} />
                <input type="hidden" name="to_email" value={user.email} />
                <input type="hidden" name="trip_loc" value={event.location} />
                <input type="hidden" name="trip_name" value={event.tripName} />
                {!isPending && <button className="my-3">Sign Up</button>}
                {isPending && <button disabled>Adding trip...</button>}
              </form>
            </div>
          </div>
        ))}
      </div>
    );
};

export default EventDetails;
