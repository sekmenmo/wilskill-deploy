//This is the page that shows details of a specific event and allows users to sign up for that event
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useFetch } from "../Pages/useFetch";
import Axios from "axios";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { UserAuth } from "../context/AuthContext";

const EventDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: event } = useFetch(
    `https://wilskill-app.herokuapp.com/trips/gettrip/${id}`
  );
  const { user } = UserAuth();
  const form = useRef();
  const firebase_ID = user.uid;
  const email = user.email;
  const { data: admin } = useFetch(
    `https://wilskill-app.herokuapp.com/admin/isAdmin/${firebase_ID}`
  );

  const deleteButton = () => {
    if (window.confirm("Are you sure you want to delete this trip?")){
    Axios.delete(`https://wilskill-app.herokuapp.com/trips/deletetrip/${id}`)
      .then(async (res) => {
        if (res.status == 204) {
          console.log(res);
          alert('Trip delete successful. REFRESH the home page to see your changes.');
        } else {
          alert('Trip delete ERROR.');
        }
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("Delete completed");
    navigate("/");
    }
  };

  const [tripID, setTripID] = useState(id);
  const [name_pronouns, setName] = useState("");
  const [vunetID, setID] = useState("");
  const [phoneNumber, setNumber] = useState("");
  const [earliest_depart_time, setDepartTime] = useState("");
  const [allergies_dietary, setDietary] = useState("");
  const [missing_items, setMissingItem] = useState("");
  const [comments_questions, setComments] = useState("");
  const [disclaimer, setDisclaimer] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  let curEventInfo = {};
  event.map((event) => {
      curEventInfo.tripName = event.tripName;
      curEventInfo.description = event.description;
      curEventInfo.leaveDate = event.leaveDate
      curEventInfo.returnDate = event.returnDate;
      curEventInfo.location = event.location;
      curEventInfo.type = event.tripType;
      curEventInfo.leadInstructor = event.lead_instructor;
      curEventInfo.instructor_email = event.instructor_email;
      curEventInfo.instructor_phone_number = event.instructor_phone_number;
      curEventInfo.openDate = event.openDate;
  });
  //console.log(curEventInfo);

  

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
      commentsQs: comments_questions,
    })
      .then(async (res) => {
        if (res.status==201) {
          console.log(res);
          alert('Signup created successfully.');
        } else {
          alert('Signup creation ERROR.');
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setIsPending(false);
    setName("");
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
      navigate('/');
  };

  let showAdmin = false;
  let hasAdminAccess = 0;
  admin.map((admin) => (hasAdminAccess = admin.isAdmin));
  if (hasAdminAccess === 1) showAdmin = true;
  return (
    <div className="event-details">
      {event.map((event) => (
        <div className="text-center" key={event.ID}>
          <h1 className="text-4xl pt-6 font-bold">{event.tripName}</h1>
          <h1 className="text-xl pt-2 font-bold">{event.tripType} at {event.location}</h1>
          {(event.leaveDate != event.returnDate) && <h1 className="text-xl pt-2 font-bold">
            {new Date(event.leaveDate).toLocaleDateString()}-
            {new Date(event.returnDate).toLocaleDateString()}
          </h1>}
          {(event.leaveDate == event.returnDate) && <h1 className="text-xl pt-2 font-bold">
            {new Date(event.leaveDate).toLocaleDateString()}
          </h1>}
          <h1 className="text-xl pt-2 italic">
            Trip Details: {event.description}
          </h1>
          <h1 className="text-l pt-2 italic pb-3">
            If you have any questions, contact the lead instructor{" "}
            {event.lead_instructor} at {event.instructor_email} or{" "}
            {event.instructor_phone_number}
          </h1>
          <div>
          {showAdmin && <Link to={`/edit-trip/${event.ID}`} state={{curEventInfo: curEventInfo}}> 
            <button className="event-button bg-[#FDCB6E] hover:bg-[#9e7f44] text-black font-bold py-4 px-4 rounded-full">
              Update Trip Information
            </button>
          </Link>}
          {showAdmin &&
            <button
              className="event-button bg-[#FDCB6E] hover:bg-[#9e7f44] text-black font-bold py-4 px-4 rounded-full"
              style={{ marginLeft: ".5rem" }}
              onClick={deleteButton}
            >
              Delete Trip
            </button>
          }
          {showAdmin && <Link to={`/view-trip/${event.ID}`}>
            <button className="event-button bg-[#FDCB6E] hover:bg-[#9e7f44] text-black font-bold py-4 px-4 rounded-full">
              View Trip Signups
            </button>
          </Link>}
          </div>
          <h1 className="pt-10"></h1>
          {((new Date(event.openDate)).setHours(20)) < (new Date()) && <div className="sign-up">
            <h1 className="text-2xl font-bold pb-4">
              Sign Up for {event.tripName}
            </h1>
            <form onSubmit={handleSubmit} ref={form}>
              <label><span className="red">*</span>Your name and pronouns:</label>
              <input
                type="text"
                required
                value={name_pronouns}
                onChange={(e) => setName(e.target.value)}
              />
              <label><span className="red">*</span>Your VU Net ID:</label>
              <input
                type="text"
                required
                value={vunetID}
                onChange={(e) => setID(e.target.value)}
              />
              <label><span className="red">*</span>Your phone number (please double check):</label>
              <input
                type="text"
                required
                value={phoneNumber}
                onChange={(e) => setNumber(e.target.value)}
              />
              <label><span className="red">*</span>What's the earliest time you could leave on {day[(new Date (event.leaveDate)).getDay()]}?</label>
              <input
                type="text"
                required
                value={earliest_depart_time}
                onChange={(e) => setDepartTime(e.target.value)}
              />
              <label><span className="red">*</span>Do you have any dietary restrictions?</label>
              <textarea
                type="text"
                required
                value={allergies_dietary}
                onChange={(e) => setDietary(e.target.value)}
              ></textarea>
              <label>Do you need any gears/items from Wilskills?</label>
              <textarea
                type="text"
                value={missing_items}
                onChange={(e) => setMissingItem(e.target.value)}
              ></textarea>
              <br></br>
              <h3><strong>** Trip Disclaimer **</strong></h3>
              <label> Wilskills trips travel through rural parts of the Southeast, 
                and we often see upsetting imagery along the way (confederate flags, political flags, hateful images/speech, etc). 
                If you have any concerns about what we might be seeing and would like to talk about it, please let me know 
                (text me ({event.lead_instructor}) at {event.instructor_phone_number})
              </label>
              <br></br>
              <input className="labeled-checkbox" type="checkbox" required/>
              <label className="checkbox-label"><span className="red">*</span>I acknowledge the statement above</label>
              <br></br>
              <br></br>
              <label>Do you have any comments or questions? </label>
              <textarea
                type="text"
                value={comments_questions}
                onChange={(e) => setComments(e.target.value)}
              ></textarea>
              <input type="hidden" name="to_name" value={user.displayName} />
              <input type="hidden" name="to_email" value={user.email} />
              <input type="hidden" name="trip_loc" value={event.location} />
              <input type="hidden" name="trip_name" value={event.tripName} />
              {!isPending && <button className="my-3">Sign Up</button>}
              {isPending && <button disabled>Signing up...</button>}
              <Link to="/">
            <button className='backButton' variant="primary" type="button">
              Back
            </button>
            </Link>
            </form>
          </div>}
          
          {((new Date(event.openDate)).setHours(20)) > (new Date()) && <label><i>trip will be available for signup on {new Date(event.openDate).toLocaleDateString()} at 8PM!</i></label>}
        </div>
      ))}
    </div>
  );
};

export default EventDetails;
