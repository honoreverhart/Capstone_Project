import { useNavigate } from "react-router-dom";
import { usersMe, getUsers, getWorkouts } from "../api";
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
  const [workoutData, setWorkoutData] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      const user = await getUsers();
      setUserData(user);
    };

    getUserData();
  }, []);

  useEffect(() => {
    const getData = async () => {
      const workout_data = await getWorkouts();
      setWorkoutData(workout_data);
    };

    getData();
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
        <h1 className="name">
          Welcome {userDetails.first_name} {userDetails.last_name}!!
        </h1>
        <div className="info">
          <a>Role: {userDetails.role}</a>
          <br></br>
          <a>Email: {userDetails.email}</a>
          <br></br>
          <a>Username: {userDetails.username}</a>
        </div>
        <button className="button" onClick={handleSignOut}>
          Sign-Out
        </button>

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
        <div className="list">
          <h3>Trainers:</h3>
          {userData && userDetails.role === "client"
            ? searchTrainer.map((users) => {
                if (users.role == "trainer") {
                  return (
                    <div key={users.id}>
                      <p>
                        {users.first_name} {users.last_name}
                      </p>
                    </div>
                  );
                }
              })
            : null}
        </div>
        <h3>Workouts:</h3>
        {workoutData &&
          workoutData.map((workout) => {
            return (
              <div className="workout" key={workout.id}>
                <a className="workoutCard">
                  <strong>Name:</strong> {workout.name}
                  <br></br>
                  <strong>Description:</strong> {workout.description}
                </a>
              </div>
            );
          })}
      </div>
    </>
  );
}
