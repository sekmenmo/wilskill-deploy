import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

export const Create = () => {
  const [title, setTitle] = useState("");
  const [leaveDate, setLeaveDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("Paddling");
  const [lead, setLead] = useState("");
  const [instructor_email, setInstructorEmail] = useState("");
  const [instructor_phone_number, setInstructorPhoneNumber] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);

    Axios.post("https://wilskill-app.herokuapp.com/trips/addtrip", {
      tripName: title,
      tripType: type,
      location: location,
      leaveDate: leaveDate,
      returnDate: returnDate,
      description: desc,
      lead_instructor: lead,
      instructor_email: instructor_email,
      instructor_phone_number: instructor_phone_number,
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
    setTitle("");
    setLeaveDate(new Date());
    setReturnDate(new Date());
    setLocation("");
    setDesc("");
    setType("Paddling");
    setLead("");
    setInstructorEmail("");
    setInstructorPhoneNumber("");
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
        <label>Trip leave date:</label>
        <input
          type="date"
          required
          value={leaveDate}
          onChange={(e) => setLeaveDate(e.target.value)}
        />
        <label>Trip return date:</label>
        <input
          type="date"
          required
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
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
        {!isPending && <button>Add trip</button>}
        {isPending && <button disabled>Adding trip...</button>}
      </form>
    </div>
  );
};

export default Create;
