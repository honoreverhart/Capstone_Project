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
    console.error("Error in fetching users", err);
  }
}
