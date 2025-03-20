import { useNavigate } from "react-router-dom";
import { usersMe, getUsers } from "../api";
import { useState, useEffect } from "react";

export default function C_Account({ token, setToken }) {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([
    {
      first_name: "",
      last_name: "",
      role: "",
    },
  ]);
  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });
  const [searchParam, setSearchParam] = useState("");

  useEffect(() => {
    const getUserData = async () => {
      const user = await getUsers();
      setUserData(user);
    };

    getUserData();
  }, []);

  useEffect(() => {
    if (!token) {
      token = localStorage.getItem("token");
    }
    const getUserDetails = async () => {
      const userInfo = await usersMe(token);
      if (userInfo) {
        setUserDetails(userInfo);
      }
    };

    getUserDetails();
  }, []);

  const handleSignOut = () => {
    navigate("/login");
    setToken(null);
    localStorage.removeItem("token");
  };

  const searchTrainer = searchParam
    ? userData.filter(
        (trainer) =>
          (trainer.first_name &&
            trainer.first_name
              .toLowerCase()
              .startsWith(searchParam.toLowerCase())) ||
          (trainer.last_name &&
            trainer.last_name
              .toLowerCase()
              .startsWith(searchParam.toLowerCase()))
      )
    : userData;
  return (
    <>
      <div>
        <h1>
          Welcome {userDetails.first_name} {userDetails.last_name}!!
        </h1>

        <h3>Your information:</h3>
        <button>Show Info</button>
        <div>
          <p>Role: {userDetails.role}</p>
          <p>Email: {userDetails.email}</p>
          <p>Username: {userDetails.username}</p>
        </div>

        <div>
          <label className="search">
            Search for Trainer:{" "}
            <input
              type="text"
              placeholder="search"
              onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
            />
          </label>
        </div>
        {/* <div className="allTrainers">
        {searchTrainer.map((trainer) => {
          return (
            {}
          );
        })}
      </div> */}
        <h3>Trainers:</h3>
        {userData && userDetails.role === "client"
          ? searchTrainer.map((users) => {
              if (users.role == "trainer") {
                return (
                  <div className="client_list" key={users.id}>
                    <p>
                      {users.first_name} {users.last_name}
                    </p>
                  </div>
                );
              }
            })
          : null}
        <button className="button" onClick={handleSignOut}>
          Sign-Out
        </button>
      </div>
    </>
  );
}
