import { useNavigate } from "react-router-dom";
import { usersMe } from "../api";
import { useState, useEffect } from "react";

export default function C_Account({ token, setToken }) {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });

  async function getUserDetails() {
    const userInfo = await usersMe(token);
    if (userInfo) {
      setUserDetails(userInfo);
    }
  }

  useEffect(() => {
    getUserDetails();
  });

  const handleSignOut = () => {
    navigate("/login");
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <>
      <div>
        <h1>
          Welcome {userDetails.first_name} {userDetails.last_name}!!
        </h1>

        <p>Client :)</p>
        <button className="button" onClick={handleSignOut}>
          Sign-Out
        </button>
      </div>
    </>
  );
}

//their information
//list of trainers
//list of workouts assigned to them
//check of completed workouts
//search for workouts
