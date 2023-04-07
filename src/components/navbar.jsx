import React from "react";
import Account from "../assets/account.png";
import Home from "../assets/home.png";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const NavBar = () => {
  const { user, logOut } = UserAuth();

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar w-full h-[80px] flex justify-between items-center px-4 bg-[#678966]">
      <div>
        <Link to="/">
          <h1 className="text-white text-2xl">Vanderbilt Wilderness Skills</h1>
        </Link>
      </div>
      <div className="flex items-center">
        {user?.displayName ? (
          <Link to="/signin">
            <h1 onClick={handleSignOut} className="text-white text-xl">
              Sign-out
            </h1>
          </Link>
        ) : (
          <Link to="/signin">
            <h1 className="text-white text-2xl">Sign-in</h1>
          </Link>
        )}

        <Link to="/">
          <h1 className="text-white text-2xl">Trips</h1>
        </Link>
        <Link to="/account">
          <h1 className="text-white text-2xl">Account</h1>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
