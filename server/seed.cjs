console.log("Hello", typeof require != "undefined");
const {
  client,
  createTables,
  createUser,
  createWorkout,
} = require("./db");

async function builtdb() {
  try {
    client.connect();
    console.log("connected to database");

    await createTables();
    console.log("tables created");

    await createUser({
      first_name: "Moe",
      last_name: "Black",
      email: "moe@gmail.com",
      username: "moe",
      password: "m_pw",
      role: "client",
    });
    await createUser({
      first_name: "Lucy",
      last_name: "Green",
      email: "lucy@gmail.com",
      username: "lucy",
      password: "l_pw",
      role: "trainer",
    });
    await createUser({
      first_name: "Ethyl",
      last_name: "Red",
      email: "ethyl@gmail.com",
      username: "ethyl",
      password: "e_pw",
      role: "trainer",
    });
    await createUser({
      first_name: "Curly",
      last_name: "Purple",
      email: "curly@gmail.com",
      username: "curly",
      password: "c_pw",
      role: "trainer",
    });
    await createWorkout({ name: "run", description: "run 4 miles" });
    await createWorkout({
      name: "bench",
      description:
        "bench 55% of your one rep max every two minutes for ten minutes",
    });
    await createWorkout({ name: "backsquat", description: "backsquat bodyweight" });

    console.log("feed done!")
    client.end();

  } catch (error) {
    throw error;
  }
}
builtdb();
