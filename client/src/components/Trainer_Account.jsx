import {
  getUsers,
  getWorkouts,
  createWorkout,
  // assigned_Workouts,
  deleteWorkout,
  usersMe,
} from "../api";
import { useState, useEffect, useRef } from "react";
import { useNavigate} from "react-router-dom";

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
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

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

  // const assignWorkout = async (workout_id, user_id) => {
  //   await assigned_Workouts(token, workout_id, user_id);
  // };

  const toggleInfo = () => {
    setIsOpen(!isOpen);
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
      document.addEventListener("click", clickOutside);
      return () => {
        document.removeEventListener("click", clickOutside);
      };
    };
  }, []);
  return (
    <>
      <div>
        <h1>
          Welcome {userDetails.first_name} {userDetails.last_name}!!
        </h1>

        <h3>Your information:</h3>
        <div className="dropdown">
          <button ref={buttonRef} className="dropdown_btn" onClick={toggleInfo}>
            Show Info
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

        <h3>Clients:</h3>
        {userData && userDetails.role === "trainer"
          ? userData.map((users) => {
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
                {/* <button
                  onClick={() =>
                    assignWorkout(workout.workout_id, userDetails.id)
                  }
                >
                  Assign Workout
                </button> */}
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
