import React from "react";
import { GoogleButton } from "react-google-button";
import { UserAuth } from "../context/AuthContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { stringWrapper } from "./stringWrapper";
import { useFetch } from "../Pages/useFetch";
import { useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Signin = () => {
  let { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();
  let { data: sqlUserData } = useFetch(
    `https://wilskill-app.herokuapp.com/users/get/`
  );

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(sqlUserData);
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      //FIXME: In the use effect, SQL user data clears, why?
      //FIXME: Don't do post call when user is already in table
      if (user) {
        //const curUser = sqlUserData.filter((u) => u.firebase_ID == user.uid);
        // if (curUser.length === 0) {
        //   console.log(curUser);
        //   axios
        //     .post("https://wilskill-app.herokuapp.com/users/adduser", {
        //       namePronouns: stringWrapper(user.displayName),
        //       email: stringWrapper(user.email),
        //       firebaseID: stringWrapper(user.uid),
        //     })
        //     .then(async (res) => {
        //       if (res) {
        //         console.log(res);
        //       }
        //     })
        //     .catch((error) => {
        //       console.log(error);
        //     });
        // }
        navigate("/account");
      }
    });
  }, [user]);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold py-4">Sign-in</h1>
      <div className="max-w-[240px] m-auto py-4">
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
    </div>
  );
};

export default Signin;
