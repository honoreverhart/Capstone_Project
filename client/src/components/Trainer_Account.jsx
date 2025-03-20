import {
  getUsers,
  getWorkouts,
  createWorkout,
  editWorkouts,
  deleteWorkout,
  usersMe,
} from "../api";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function T_Account({ token, setToken }) {
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
    role: "",
  });
  const [workout, setWorkout] = useState({
    name: "",
    description: "",
  });
  const [workoutData, setWorkoutData] = useState([]);
  const [searchParam, setSearchParam] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    try {
      const getUserData = async () => {
        const user = await getUsers();
        setUserData(user);
      };

      getUserData();
    } catch (error) {
      console.log("Trouble getting everyone's public information", error);
    }
  }, []);

  useEffect(() => {
    try {
      if (!token) {
        token = localStorage.getItem("token");
        setToken(token);
      }
      const getUserDetails = async () => {
        const userInfo = await usersMe(token);
        if (userInfo) {
          setUserDetails(userInfo);
        }
      };

      getUserDetails();
    } catch (error) {
      console.log("trouble getting private user information", error);
    }
  }, [token]);

  useEffect(() => {
    const getData = async () => {
      const workout_data = await getWorkouts();
      setWorkoutData(workout_data);
    };

    getData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkout((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const create_workout = await createWorkout(workout);
    setWorkoutData((prevData) => {
      return [...prevData, create_workout];
    });
  };

  const handleSignOut = () => {
    navigate("/login");
    setToken(null);
    localStorage.removeItem("token");
  };

  const handleDelete = async (id) => {
    await deleteWorkout(id, token);
    const newState = workoutData.filter((workout) => workout.id !== id);
    console.log("new state" + newState);
    setWorkoutData(newState);
  };

  const edit_workout = async (workout_id, user_id) => {
    await editWorkouts(token, workout_id, user_id);
  };

  const searchClient = searchParam
    ? userData.filter(
        (client) =>
          client.first_name &&
          client.first_name
            .toLowerCase()
            .startsWith(searchParam.toLowerCase()) ||
          client.last_name &&
          client.last_name.toLowerCase().startsWith(searchParam.toLowerCase())
      )
    : userData;

  const toggleInfo = () => {
    setIsOpen(!isOpen);
    console.log("hello", isOpen);
  };

  useEffect(() => {
    const clickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("click", clickOutside);
    } else {
      document.addEventListener("click", clickOutside);
    }
    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div>
        <h1>
          Welcome {userDetails.first_name} {userDetails.last_name}!!
        </h1>

        <h3>Your information:</h3>
        <div className="dropdown">
          <button ref={buttonRef} className="dropdown_btn" onClick={toggleInfo}>
            {isOpen ? "Show Info" : "hide info"}
          </button>
          {isOpen && (
            <div ref={dropdownRef} className="dropdown_info">
              <a>Role: {userDetails.role}</a>
              <a>Email: {userDetails.email}</a>
              <a>Username: {userDetails.username}</a>
            </div>
          )}
        </div>

        <button className="button" onClick={handleSignOut}>
          Sign-Out
        </button>
        <label className="search">
          Search for Client:{" "}
          <input
            type="text"
            placeholder="search"
            onChange={(e) => setSearchParam(e.target.value.toLowerCase())}
          />
        </label>
        <h3>Clients:</h3>
        {userData && userDetails.role === "trainer"
          ? searchClient.map((users) => {
              if (users.role == "client") {
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

        <form className="createWorkout" onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={workout.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={workout.description}
              onChange={handleChange}
              required
            />
          </label>
          <button>Create Workout</button>
        </form>

        <h3>Workouts:</h3>
        {workoutData &&
          workoutData.map((workout) => {
            return (
              <div className="workoutCard" key={workout.id}>
                <p>
                  <strong>Name:</strong> {workout.name}
                </p>
                <p>
                  <strong>Description:</strong> {workout.description}
                </p>
                <button
                  onClick={() => edit_workout(workout.id, userDetails.id)}
                >
                  Edit Workout
                </button>
                <button onClick={() => handleDelete(workout.id)}>
                  Delete Workout
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
}
