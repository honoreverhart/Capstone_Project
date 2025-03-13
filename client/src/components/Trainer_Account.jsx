import { useNavigate } from "react-router-dom";
import { getWorkouts, createWorkout, assigned_Workouts, deleteWorkout } from "../api";
import { useState, useEffect } from "react";

export default function T_Account() {

  const handleSubmit = async (e) =>{
    e.preventDefault()
    const create_workout = await createWorkout();
    
  }

  return (
    <>
      <p>Trainer :)</p>

      <form onSubmit={handleSubmit()}>
        <label>
          <input>
          </input>
        </label>
        <button>Create Workout</button>
      </form>
    </>
  );
}

//their information
//present a list of their clients
//a list of workouts they made
//option to create workouts
//option to delete workouts
//assign workouts to each client