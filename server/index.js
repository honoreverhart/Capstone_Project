const {
  client,
  createTables,
  createUser,
  fetchUser,
  createWorkout,
  fetchWorkout,
  destroyWorkout,
  editWorkout,
  authenticate,
  findUserWithToken,
} = require("./db");
const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");

const path = require("path");

app.use(cors());
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../client/dist/index.html"))
);
app.use(
  "/assets",
  express.static(path.join(__dirname, "../client/dist/assets"))
);
app.use(
  "/pictures",
  express.static(path.join(__dirname, "../client/dist/pictures"))
);

//middleware
const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).send("Token is required");
    }

    const user = await findUserWithToken(token);
    if (!user) {
      return res.status(401).send("Invalid token or user not found");
    }

    req.user = user;

    next();
  } catch (ex) {
    next(ex);
  }
};
//REST
app.post("/api/auth/login", async (req, res, next) => {
  try {
    res.send(await authenticate(req.body));
  } catch (ex) {
    next(ex);
  }
});

app.post("/api/auth/register", async (req, res, next) => {
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
    res.send(
      await createWorkout({
        name: req.body.name,
        description: req.body.description,
      })
    );
  } catch (ex) {
    next(ex);
  }
});

app.delete("/api/workouts/:id", isLoggedIn, async (req, res, next) => {
  try {
    res.send(await destroyWorkout(req.params.id));
  } catch (ex) {
    next(ex);
  }
});

app.patch("/api/edit_workout", isLoggedIn, async (req, res, next) => {
  try {
    const { id, name, description } = req.body;
    if (!id || !name || !description) {
      return res
        .status(400)
        .send("Missing required fields: id, name, description");
    }

    if (req.user.role !== "trainer") {
      return res
        .status(403)
        .send("Only trainers are permitted to edit workouts");
    }
    const result = await editWorkout({ id, name, description });
    res.status(200).send(result);
  } catch (ex) {
    console.error("failed to patch: ", ex);
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
