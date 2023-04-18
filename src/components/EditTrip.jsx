import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { useFetch } from "../Pages/useFetch";
import { useLocation } from "react-router-dom";



const EditTrip = () => {
    //get the event data for this specific event
    const { id } = useParams();
    const { data: event } = useFetch(
      `https://wilskill-app.herokuapp.com/trips/gettrip/${id}`
    );
    
    const pgLocation = useLocation();
    const { curEventInfo } = pgLocation.state;


    //fetch current trip info, map, set
    const [title, setTitle] = useState(curEventInfo.tripName);
    const [leaveDate, setLeaveDate] = useState(curEventInfo.leaveDate.substring(0,10));
    const [returnDate, setReturnDate] = useState(curEventInfo.returnDate.substring(0,10));
    const [openDate, setOpenDate] = useState(curEventInfo.openDate.substring(0,10));
    const [location, setLocation] = useState(curEventInfo.location);
    const [desc, setDesc] = useState(curEventInfo.description);
    const [type, setType] = useState(curEventInfo.type);
    const [lead, setLead] = useState(curEventInfo.leadInstructor);
    const [instructor_email, setInstructorEmail] = useState(curEventInfo.instructor_email);
    const [instructor_phone_number, setInstructorPhoneNumber] = useState(curEventInfo.instructor_phone_number);
    const [isDayTrip, setIsDayTrip] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const num = useParams();
    

  const handleDayTripCheckbox = () => {
    setIsDayTrip(!isDayTrip);
  };

  //define the button for updating information
  const updateButton = () => {
    
    if(returnDate < leaveDate) {
      alert("Current dates selected conflict");
      return;
    }

    Axios.post(`https://wilskill-app.herokuapp.com/trips/updatetrip/${id}`, {
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
        if (res.status==201) {
          console.log(res);
          alert('Trip updated successfully.');
        } else {
          alert('Trip update ERROR.');
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
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);
  };


  return (
    <div className="edit-trip">
      {event.map((event) => (
        <div className="text-center" key={event.ID}>
          <h1 className="font-bold">
            Update Trip Information for {event.tripName}
          </h1>

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
            <button variant="primary" type="button" onClick={updateButton}>
              Update Trip Information
            </button>
            <Link to={`/events/${num.id}`}>
            <button className="backButton" variant="primary" type="button">
              Back
            </button>
            </Link>
          </form>
        </div>
      ))}
    </div>
  );
};

export default EditTrip;
