import {
  getWorkouts,
  createWorkout,
  assigned_Workouts,
  deleteWorkout,
} from "../api";
import {useState, useEffect, } from "react";
import { useNavigate } from "react-router-dom";

export default function T_Account({ setToken }) {
  const navigate = useNavigate();
  const [workoutData, setWorkoutData] = useState({
    name: "",
    description: "",
  });

  const [createWorkoutResult, setCreateWorkoutResult] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setWorkoutData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const create_workout = await createWorkout(workoutData);
    setCreateWorkoutResult(create_workout);
  };

  const handleSignOut = () =>{
    navigate("/login");
    setToken(null)
    localStorage.removeItem("token")
  }

  return (
    <>
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
            value={workoutData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={workoutData.description}
            onChange={handleChange}
            required
          />
        </label>
        <button>Create Workout</button>
      </form>

      {createWorkoutResult && (
        <div className="workoutCard">
          <h3>Workout Created:</h3>
          <p><strong>Name:</strong> {createWorkoutResult.name}</p>
          <p><strong>Description:</strong> {createWorkoutResult.description}</p>
        </div>
      )}
    </>
  );
}

//their information
//present a list of their clients
//a list of workouts they made
//option to create workouts
//option to delete workouts
//assign workouts to each client
