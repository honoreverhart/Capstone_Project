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
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");

const path = require("path");
app.get("/", (req, res) =>
  res.sendFile(
    path.join(__dirname, "../client/Capstone_Project/dist/index.html")
  )
);
app.use(
  cors()
)
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
app.post("/api/auth/register", async (req, res, next) => {
  try {
    res.send(await authenticate(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/users", async (req, res, next) => {
  try {
    res.send(await createUser(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/auth/me", isLoggedIn, (req, res, next) => {
  try {
    res.send(req.user);
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/users", async (req, res, next) => {
  try {
    res.send(await fetchUser());
  } catch (ex) {
    next(ex);
  }
});

app.get("/api/workouts", async (req, res, next) => {
  try {
    res.send(await fetchWorkout());
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/workouts", async (req, res, next) => {
  try {
    res.send(await createWorkout({name: req.body.name, description: req.body.description}));
  } catch (ex) {
    next(ex);
  }
});

app.delete("/api/workouts/:id", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await destroyWorkout({ id: req.params.id }));
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/assigned_workouts", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await assignWorkout(req.params.workout_id, req.params.user_id));
  } catch (ex) {
    next(ex);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res
    .status(err.status || 500)
    .send({ error: err.message ? err.message : err });
});

const init = async () => {
  const port = process.env.PORT || 3000;
  await client.connect();
  console.log("connected to database");

  app.listen(port, () => console.log(`listening on port ${port}`));
};

init();
