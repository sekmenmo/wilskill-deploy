//This is the page that shows all the signup information for a specific trip
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useFetch } from "../Pages/useFetch";
import Axios from "axios";
import { Link } from "react-router-dom";
import SignupCard from "./SignupCard";

const TripSignup = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: signups } = useFetch(
    `https://wilskill-app.herokuapp.com/signups/getsignup/${id}`
  );
  const { data: event } = useFetch(
    `https://wilskill-app.herokuapp.com/trips/gettrip/${id}`
  );
  const selectedArr = [];
  const [selectedUsers, setSelectedUsers] = useState(selectedArr);
  const [numSelected, setNumSelected] = useState(0);

  const addUserSignup = (event) => {
    if(selectedUsers.includes(event.currentTarget.children[0])) {
      const index = selectedUsers.indexOf(event.currentTarget.children[0]);
      if (index > -1) { // only splice array when item is found
      selectedUsers.splice(index, 1); // 2nd parameter means remove one item only 
      }
    }
    else selectedUsers.push(event.currentTarget.children[0]);
    setNumSelected(selectedUsers.length);
    console.log(selectedUsers);
  };
  
  const copyToClipboard = () => {
    let copyString = "";
    selectedUsers.forEach(v => copyString += (v.children[1].innerText.replace("Email: ", "") + ", "))
    if (copyString.length > 3) copyString = copyString.slice(0, -2);
    console.log(copyString)
    navigator.clipboard.writeText(copyString);
  };

  const deleteButton = (signup) => {
    if (window.confirm("Are you sure you want to delete this signup?")){
      console.log(signup);
      const tripID = signup.tripID;
      const vunetID = signup.vunet_ID;
      Axios.delete(`https://wilskill-app.herokuapp.com/signups/deletesignup/${tripID}/${vunetID}`)
        .then(async (res) => {
          if (res.status == 204) {
            console.log(res);
            alert('Signup delete successful.');
          } else {
            alert('Signup delete ERROR.');
          }
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("Delete completed");
    }
    // navigate(0);
  }

  return (
    <div className="pb-30 signup-list">
      <div className="text-center">
        <h1 className="pt-2"></h1>
        <ul>
          <h1 className="text-3xl pt-2 font-bold">
            {event.tripName} Trip Signups
          </h1>
          <br></br>
          {signups.map((signup) => (
              <li key={signup.email + signup.signup_time}>
              <div onClick={addUserSignup}>
              <SignupCard user={signup} className="signupCard"></SignupCard>
              </div>
              <button className = "delete-signup-card" 
                          variant='primary' 
                          type='button'
                          onClick={() => {deleteButton(signup)}}><b> Delete This Signup </b></button>
              </li>
          ))}
        </ul>
        <div className="bottom-sect">
            <label><i>{numSelected} students selected   </i></label>
            <button className="event-button bg-[#FDCB6E] hover:bg-[#9e7f44] text-black font-bold py-4 px-4 rounded-full" onClick={copyToClipboard}> 
                      Copy Selected Emails  
            </button>
            <Link to={`/events/${id}`}>
              <button className="backButton" variant="primary" type="button">
                    Back
              </button>
            </Link>
          </div>
      </div>
    </div>
  );
};

export default TripSignup;
