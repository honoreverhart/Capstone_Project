const {
    client,
    createTables,
    createUser,
    fetchUser,
    createWorkout,
    fetchWorkout,
    destroyWorkout,
    authenticate,
    findUserWithToken
  } = require("./db");
  
  await client.connect();
  console.log("connected to database");
  
  await createTables();
  console.log("tables created");