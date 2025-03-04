const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL ||
    "postgres://Honor:Ephesians4:29@localhost:/capstone_project_db"
);
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const JWT = process.env.JWT || "shhh";
const jwt = require("jsonwebtoken");

const createTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS workout_plans;
    DROP TABLE IF EXISTS workouts;
    DROP TABLE IF EXISTS clients;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS trainers;
    CREATE TABLE users(
        id UUID PRIMARY KEY,
        username VARCHAR(20) UNIQUE NOT NULL,
        password VARCHAR (255) NOT NULL,
    );
    CREATE TABLE trainers(
        id UUID PRIMARY KEY,
        username VARCHAR(20) UNIQUE NOT NULL,
        password VARCHAR (255) NOT NULL,
    )
    CREATE TABLE clients(
        id UUID PRIMARY KEY,
        user_id UUID REFERENCES users(id) NOT NULL,
        trainer_id UUID REFERENCES trainer(id) NOT NULL
    );
    CREATE TABLE workouts(
        id UUID PRIMARY KEY,
        name VARCHAR(20) NOT NULL,
        description VARCHAR(500) NOT NULL,
    );
    CREATE TABLE workout_plans(
        id UUID PRIMARY KEY,
        user_id UUID REFERENCES users(id) NOT NULL,
        trainer_id UUID REFERENCES trainer(id) NOT NULL,
        workout_id UUID REFERENCES workouts(id) NOT NULL,
    );

    `;
  await client.query(SQL);
};

const createUser = async ({ username, password }) => {
  const SQL = `
    INSERT INTO users(id, username, password) VALUES($1, $2, $3) RETURNING *
    `;
  const response = await client.query(SQL, [
    uuid.v4(),
    username,
    await bcrypt.hash(password, 5),
  ]);
  return response.rows[0];
};

const createTrainer = async ({ username, password }) => {
  const SQL = `
    INSERT INTO trainers(id, username, password) VALUES($1, $2, $3) RETURNING *
    `;
  const response = await client.query(SQL, [
    uuid.v4(),
    username,
    await bcrypt.hash(password, 5),
  ]);
  return response.rows[0];
};

const createClient = async ({ user_id, trainer_id }) => {
  const SQL = `
    INSERT INTO clients(id, user_id, trainer_id) VALUES($1, $2, $3) RETURNING *
    `;
  const response = await client.query(SQL, [uuid.v4(), user_id, trainer_id]);
  return response.rows[0];
};

const fetchUser = async () => {
  const SQL = `
    SELECT id, username FROM users;
    `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchTrainer = async () => {
  const SQL = `
    SELECT id, username FROM trainers;
    `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchClient = async ({ user_id }) => {
  const SQL = `
    SELECT * FROM clients WHERE user_id = $1
    `;
  const response = await client.query(SQL, [user_id]);
  return response.rows;
};

const destroyClient = async ({ user_id, id }) => {
  const SQL = `
    DELETE FROM clients WHERE user_id=$1 AND id=$2
    `;
  await client.query(SQL, [user_id, id]);
};

const createWorkout = async () => {};

const createWorkout_Plan = async () => {};

const fetchWorkout = async () => {};

const fetchWorkout_Plan = async () => {};

const destroyWorkout = async () => {};

const destroyWorkout_Plan = async () => {};

const authenticate = async ({ username, password }) => {
  const SQL = `
    SELECT id, username, password FROM users WHERE username=$1
    `;
  const response = await client.query(SQL, [username]);
  if (
    !response.rows.length ||
    (await bcrypt.compare(password, response.rows[0].pasword)) === false
  ) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  console.log(response);
  const token = jwt.sign(response.rows[0], JWT);
  return { token: token };
};

const findUserWithToken = async (token) => {
  try {
    const payload = jwt.verify(token.replace("Bearer ", ""), JWT);
    console.log(payload + "Hello World");
    return payload;
  } catch (ex) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
};

module.exports = {
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
  findUserWithToken,
};
