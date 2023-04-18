import React from "react";
import { UserAuth } from "../context/AuthContext";
import { useState } from "react";
import { storage } from "../config";
import { ref, uploadBytes } from "firebase/storage";
import { useFetch } from "../Pages/useFetch";
import Axios from "axios";

const Account = () => {
  const [waiverUpload, setWaiverUpload] = useState(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const { user } = UserAuth();
  const { data: userInfo } = useFetch(
    `https://wilskill-app.herokuapp.com/users/getuser/${user.uid}`
  );
  const uploadWaiver = () => {
    if (waiverUpload == null) return;
    const imageRef = ref(storage, `waivers/${user.displayName}`);
    uploadBytes(imageRef, waiverUpload).then(() => {
      // call sql query to update date of latest waiver upload
      const firebase_ID = user.uid;
      console.log(firebase_ID);
      Axios.post(
        `https://wilskill-app.herokuapp.com/users/updateWaiverTime/${firebase_ID}`
      )
        .then(async (res) => {
          if (res.status == 201) {
            console.log(res);
            alert("Waiver uploaded");
          }
          else {
            alert("Waiver upload ERROR.");
          }
        })
        .catch((error) => {
          console.log(error);
        });
      console.log("Update completed");
      setIsUploaded(true);
    });
  };

  let latestWaiverUpload = "";
  userInfo.map((userInfo) => (latestWaiverUpload = userInfo.latest_waiver));
  console.log(latestWaiverUpload);
  if (latestWaiverUpload != "" && latestWaiverUpload != null)
    return (
      <div className="text-center">
        <h1 className="text-center text-2xl font-bold py-4">Account</h1>
        <h1 className="text-center">Welcome, {user?.displayName}</h1>
        <h1 className="text-center">
          Most Recent Waiver Uploaded on:{" "}
          {new Date(latestWaiverUpload).toLocaleDateString("en-US")}
        </h1>
        <br></br>
        {!isUploaded && (
          <input
            type="file"
            onChange={(event) => {
              setWaiverUpload(event.target.files[0]);
            }}
          />
        )}
        {!isUploaded && (
          <button
            className="bg-[#FDCB6E] hover:bg-[#9e7f44] text-black font-bold py-1 px-2 mx-3 rounded-full"
            onClick={uploadWaiver}
          >
            Upload Waiver
          </button>
        )}
        {isUploaded && (
          <h1 className="text-center text-xl font-bold">
            You have uploaded your waiver!
          </h1>
        )}
      </div>
    );
  else
    return (
      <div className="text-center">
        <h1 className="text-center text-2xl font-bold py-4">Account</h1>
        <h1 className="text-center">Welcome, {user?.displayName}</h1>
        <br></br>
        {!isUploaded && (
          <input
            type="file"
            onChange={(event) => {
              setWaiverUpload(event.target.files[0]);
            }}
          />
        )}
        {!isUploaded && (
          <button
            className="bg-[#FDCB6E] hover:bg-[#9e7f44] text-black font-bold py-1 px-2 mx-3 rounded-full"
            onClick={uploadWaiver}
          >
            Upload Waiver
          </button>
        )}
        {isUploaded && (
          <h1 className="text-center text-xl font-bold">
            You have uploaded your waiver!
          </h1>
        )}
      </div>
    );
};

export default Account;
