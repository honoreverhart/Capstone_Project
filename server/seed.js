const {
    client,
    createTables,
    createUser,
    createTrainer,
    createClient,
    fetchUser,
    fetchTrainer,
    fetchClient, 
    destroyClient, //might not use
    createWorkout,
    createWorkout_Plan,
    fetchWorkout,
    fetchWorkout_Plan,
    destroyWorkout,
    destroyWorkout_Plan,
    authenticate,
    findUserWithToken
  } = require("./db");
  
  await client.connect();
  console.log("connected to database");
  
  await createTables();
  console.log("tables created");