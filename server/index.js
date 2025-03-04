const {
  client,
  createTables,
  createUser,
  createTrainer,
  createClient,
  fetchUser,
  fetchTrainer,
  fetchClient,
  destroyClient,
  createWorkout,
  createWorkout_Plan,
  fetchWorkout,
  fetchWorkout_Plan,
  destroyWorkout,
  destroyWorkout_Plan,
  authenticate,
  findUserWithToken,
} = require("./db");
const express = require("express");
const app = express();
app.use(express.json());

const path = require("path");
app.get("/", (req, res) =>
  res.sendFile(
    path.join(__dirname, "../client/Capstone_Project/dist/index.html")
  )
);
app.use(
  "/assets",
  express.static(path.join(__dirname, "../client/Capstone_Project/dist/assets"))
);

//middleware
const isLoggedIn = (req, res, next) => {
  try {
    req.user = findUserWithToken(req.header("Authorization"));
    next();
  } catch (ex) {
    next(ex);
  }
};
//REST

const init = async () => {
  const port = process.env.PORT || 3000;
  await client.connect();
  console.log("connected to database");

  app.listen(port, () => console.log(`listening on port ${port}`));
};

init();
