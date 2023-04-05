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
            <button
              onClick={handleSignOut}
              className="bg-[#FDCB6E] hover:bg-[#9e7f44] text-black font-bold py-2 px-3 mx-3 rounded-full"
            >
              Sign-out
            </button>
          </Link>
        ) : (
          <Link to="/signin">
            <button className="bg-[#FDCB6E] hover:bg-[#9e7f44] text-black font-bold py-2 px-3 mx-3 rounded-full">
              Sign-in
            </button>
          </Link>
        )}

        <Link to="/">
          <img src={Home} alt="Home" style={{ height: 52 }} />
        </Link>
        <Link to="/account">
          <img src={Account} alt="Account" />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
