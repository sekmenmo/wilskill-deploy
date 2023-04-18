import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Axios from "axios";

export const Create = () => {
  const [title, setTitle] = useState("");
  const [leaveDate, setLeaveDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("Paddling");
  const [lead, setLead] = useState("");
  const [instructor_email, setInstructorEmail] = useState("");
  const [instructor_phone_number, setInstructorPhoneNumber] = useState("");
  const [isDayTrip, setIsDayTrip] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const navigate = useNavigate();

  const handleDayTripCheckbox = () => {
    setIsDayTrip(!isDayTrip);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);

    if(returnDate < leaveDate) {
      alert("Current dates selected conflict");
      setIsPending(false);
      return;
    }

    Axios.post("https://wilskill-app.herokuapp.com/trips/addtrip", {
      tripName: title,
      tripType: type,
      location: location,
      leaveDate: leaveDate,
      returnDate: returnDate,
      openDate: openDate,
      description: desc,
      lead_instructor: lead,
      instructor_email: instructor_email,
      instructor_phone_number: instructor_phone_number,
    })
      .then(async (res) => {
        if (res.status == 201) {
          console.log(res);
          alert('Trip created successfully. REFRESH the home page to see your changes.');
        }
        else {
          alert('Trip creation ERROR.');
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setIsPending(false);
    setTitle("");
    setLeaveDate(new Date());
    setReturnDate(new Date());
    setOpenDate(new Date());
    setLocation("");
    setDesc("");
    setType("Paddling");
    setLead("");
    setInstructorEmail("");
    setInstructorPhoneNumber("");
    navigate('/');
  };

  return (
    <div className="create">
      <h1 className="font-bold">Create a New Event</h1>
      <form onSubmit={handleSubmit}>
        <label>Trip title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input className="labeled-checkbox-2" type="checkbox" onChange={handleDayTripCheckbox}/>
        <label className="checkbox-label-2">Is this a day trip?</label>
        <br></br>
        {!isDayTrip && <label>Trip leave date:</label>}
        {isDayTrip && <label>Trip date:</label>}
        {!isDayTrip && <input
          type="date"
          required
          value={leaveDate}
          onChange={(e) => setLeaveDate(e.target.value)}
        />}
        {isDayTrip && <input
          type="date"
          required
          value={leaveDate}
          onChange={(e) => {setLeaveDate(e.target.value); setReturnDate(e.target.value)}}
        />}
        {!isDayTrip && <label>Trip return date:</label>}
        {!isDayTrip && <input
          type="date"
          required
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />}
        <label>Trip location:</label>
        <input
          type="text"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label>Trip description:</label>
        <textarea
          required
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
        <label>Trip type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Paddling">Paddling</option>
          <option value="Climbing">Climbing</option>
          <option value="Backpacking">Backpacking</option>
          <option value="Caving">Caving</option>
          <option value="Day Hike">Day Hike</option>
        </select>
        <label>Lead Instructor:</label>
        <textarea
          required
          value={lead}
          onChange={(e) => setLead(e.target.value)}
        ></textarea>
        <label>Lead Instructor Email:</label>
        <textarea
          required
          value={instructor_email}
          onChange={(e) => setInstructorEmail(e.target.value)}
        ></textarea>
        <label>Lead Instructor Phone Number:</label>
        <textarea
          required
          value={instructor_phone_number}
          onChange={(e) => setInstructorPhoneNumber(e.target.value)}
        ></textarea>
        <label>Signup Release Date (always at 8PM CST!):</label>
        <input
          type="date"
          required
          value={openDate}
          onChange={(e) => setOpenDate(e.target.value)}
        />
        {!isPending && <button>Add trip</button>}
        {isPending && <button disabled>Adding trip...</button>}
        <Link to="/">
            <button className='backButton' variant="primary" type="button">
              Back
            </button>
        </Link>
      </form>
    </div>
  );
};

export default Create;
