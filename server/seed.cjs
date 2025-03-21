console.log("Hello", typeof require != "undefined");
const {
  client,
  createTables,
  createUser,
  fetchUser,
  createWorkout,
  fetchWorkout,
  destroyWorkout,
  assignWorkout,
  authenticate,
  findUserWithToken,
} = require("./db");

async function builtdb() {
  try {
    client.connect();
    console.log("connected to database");

    await createTables();
    console.log("tables created");

    const [moe, lucy, ethyl, curly, run, bench, backsquat] = await Promise.all([
      createUser({
        first_name: "Moe",
        last_name: "Black",
        email: "moe@gmail.com",
        username: "moe",
        password: "m_pw",
        role: "client"
      }),
      createUser({
        first_name: "Lucy",
        last_name: "Green",
        email: "lucy@gmail.com",
        username: "lucy",
        password: "l_pw",
        role: "trainer"
      }),
      createUser({
        first_name: "Ethyl",
        last_name: "Red",
        email: "ethyl@gmail.com",
        username: "ethyl",
        password: "e_pw",
        role: "trainer"
      }),
      createUser({
        first_name: "Curly",
        last_name: "Purple",
        email: "curly@gmail.com",
        username: "curly",
        password: "c_pw",
        role: "trainer"
      }),
      createWorkout({ name: "run", description: "run 4 miles" }),
      createWorkout({
        name: "bench",
        description:
          "bench 55% of your one rep max every two minutes for ten minutes",
      }),
      createWorkout({ name: "backsquat", description: "backsquat bodyweight" }),
    ]);
    
    console.log(await fetchUser());
    console.log(await fetchWorkout());
    
  } catch (error) {
    throw error;
  }
}
builtdb();