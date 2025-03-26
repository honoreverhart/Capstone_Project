const BASE_URL = "http://localhost:3000/api";

export async function getUsers() {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error in fetching users", error);
  }
}

export async function getRegisterToken(formData) {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        username: formData.username,
        password: formData.password,
        workouts: formData.workouts,
        role: formData.role,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in fetching tokens", error);
  }
}

export async function getLoginToken(formData) {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in fetching tokens", error);
  }
}

export async function usersMe(token) {
  try {
    const response = await fetch(`${BASE_URL}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

export async function getWorkouts() {
  try {
    const response = await fetch(`${BASE_URL}/workouts`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error in fetching users", error);
  }
}

export async function createWorkout(setWorkoutData) {
  try {
    const response = await fetch(`${BASE_URL}/workouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: setWorkoutData.name,
        description: setWorkoutData.description,
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in fetching users", error);
  }
}

export async function editWorkouts(id, token, name, description) {
  try {
    const response = await fetch(`${BASE_URL}/edit_workout`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id,
        name,
        description,
      }),
    });
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      console.error("Failed to edit workout:", response.status);
    }
  } catch (error) {
    console.error("Oops! There was an error", error);
  }
}

export async function deleteWorkout(id, token) {
  try {
    const response = await fetch(`${BASE_URL}/workouts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Unable to delete workout", error);
  }
}
