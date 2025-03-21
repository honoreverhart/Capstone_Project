import {
  getUsers,
  getWorkouts,
  createWorkout,
  editWorkouts,
  deleteWorkout,
  usersMe,
} from "../api";
import { useState, useEffect } from "react";
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
  const [editWorkout, setEditWorkout] = useState({
    id: "",
    name: "",
    description: "",
  });
  const [isEditingWorkout, setIsEditingWorkout] = useState(false);

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

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditWorkout((prevData) => ({
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
    setWorkoutData(newState);
  };

  const handle_Edit_workout = async (id, name, description) => {
    await editWorkouts(id, token, name, description);
  };

  const allowEditWorkout = (id, name, description) => {
    setEditWorkout({
      id,
      name,
      description,
    });
    setIsEditingWorkout(true);
  };

  const searchClient = searchParam
    ? userData.filter(
        (client) =>
          (client.first_name &&
            client.first_name
              .toLowerCase()
              .startsWith(searchParam.toLowerCase())) ||
          (client.last_name &&
            client.last_name
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

        <div className="info">
          <a>Role: {userDetails.role}</a>
          <br></br>
          <a>Email: {userDetails.email}</a>
          <br></br>
          <a>Username: {userDetails.username}</a>
        </div>
        <button className="signout-button" onClick={handleSignOut}>
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
                  <div className="list" key={users.id}>
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
              <div className="workout" key={workout.id}>
                <a className="workoutCard">
                  <strong>Name:</strong> {workout.name}
                  <br></br>
                  <strong>Description:</strong> {workout.description}
                  <div cassName="button-container">
                    <button
                      onClick={() =>
                        allowEditWorkout(
                          workout.id,
                          workout.name,
                          workout.description
                        )
                      }
                    >
                      Edit Workout
                    </button>
                    <br></br>
                    <button onClick={() => handleDelete(workout.id)}>
                      Delete Workout
                    </button>
                  </div>
                </a>
              </div>
            );
          })}
      </div>
      {isEditingWorkout && (
        <div>
          <form
            className="login"
            onSubmit={() =>
              handle_Edit_workout(
                editWorkout.id,
                editWorkout.name,
                editWorkout.description
              )
            }
          >
            <label>
              Name:{" "}
              <input
                type="text"
                name="name"
                value={editWorkout.name}
                onChange={handleEditChange}
                required
              />
            </label>
            <label>
              Description:{" "}
              <input
                type="text"
                name="description"
                value={editWorkout.description}
                onChange={handleEditChange}
                required
              />
            </label>
            <button className="button">Edit</button>
          </form>
        </div>
      )}
    </>
  );
}
