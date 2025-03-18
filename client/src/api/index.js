const BASE_URL = "http://localhost:3000/api";

export default async function getUsers() {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    const result = json.users;
    console.log(result);
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

//issue
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
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error in fetching users", error);
  }
}

//patch instead of get?
export async function assigned_Workouts() {}


//issue -- id?
export async function deleteWorkout(id, token) {
  try {
    const response = await fetch(`${BASE_URL}/workouts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    // const result = await response.json();
    console.log(response);
    // return result;
    // window.location.reload();
  } catch (error) {
    console.error("Unable to delete workout", error);
  }
}
