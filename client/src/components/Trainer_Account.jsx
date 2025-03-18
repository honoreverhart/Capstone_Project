import {
  getWorkouts,
  createWorkout,
  assigned_Workouts,
  deleteWorkout,
  usersMe,
} from "../api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function T_Account({ token, setToken }) {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });
  const [workout, setWorkout] = useState({
    name: "",
    description: "",
  });
  const [workoutData, setWorkoutData] = useState([]);

  async function getUserDetails() {
    const userInfo = await usersMe(token);
    if (userInfo) {
      setUserDetails(userInfo);
    }
  }

  useEffect(() => {
    getUserDetails();
  });

  useEffect(() => {
    const getData = async () => {
      const workout_data = await getWorkouts();
      console.log(workout_data);
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

  return (
    <>
      <div>
        <h1>
          Welcome {userDetails.first_name} {userDetails.last_name}!!
        </h1>
        <p>Trainer :)</p>
        <button className="button" onClick={handleSignOut}>
          Sign-Out
        </button>

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
        <h3>Workout Created:</h3>
        {workoutData.map((workout) => {
          return (
            <div className="workoutCard" key={workout.id}>
              <p>
                <strong>Name:</strong> {workout.name}
              </p>
              <p>
                <strong>Description:</strong> {workout.description}
              </p>
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

//their information
//present a list of their clients
//a list of workouts CHECK
//option to create workouts CHECK
//option to delete workouts CHECK
//assign workouts to each client
//search bar for clients and workouts
