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
      navigate("/account");
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
