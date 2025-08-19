const pg = require("pg");
const client = new pg.Client(
  process.env.DATABASE_URL ||
    "postgres://Honor:Ephesians429@localhost:5432/capstone_project_db"
);
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const JWT = process.env.JWT || "shhh";
const jwt = require("jsonwebtoken");
require("dotenv").config();

const createTables = async () => {
  const SQL = `
    DROP TABLE IF EXISTS editWorkouts;
    DROP TABLE IF EXISTS workouts;
    DROP TABLE IF EXISTS users;
    DROP TYPE IF EXISTS role_enum;
    CREATE TYPE role_enum AS ENUM ('trainer', 'client');
    CREATE TABLE users(
        id UUID PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role role_enum NOT NULL
    );
    CREATE TABLE workouts(
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL
    );
   CREATE TABLE editWorkouts(
        user_id UUID REFERENCES users(id) NOT NULL,
        workout_id INTEGER REFERENCES workouts(id) NOT NULL
  );
    
    `;

  await client.query(SQL);
};

const createUser = async ({
  first_name,
  last_name,
  email,
  username,
  password,
  role,
}) => {
  const SQL = `
    INSERT INTO users(id, first_name, last_name, email, username, password, role) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `;
  const response = await client.query(SQL, [
    uuid.v4(),
    first_name,
    last_name,
    email,
    username,
    await bcrypt.hash(password, 5),
    role,
  ]);
  const authResponse = await authenticate({ username, password });
  return { user: response.rows[0], token: authResponse.token };
};

const fetchUser = async () => {
  const SQL = `
    SELECT id, username, first_name, last_name, role FROM users;
    `;
  const response = await client.query(SQL);
  return response.rows;
};

const createWorkout = async ({ name, description }) => {
  const SQL = `
    INSERT INTO workouts(name, description) VALUES($1, $2) RETURNING *
    `;
  const response = await client.query(SQL, [name, description]);
  return response.rows[0];
};

const fetchWorkout = async () => {
  const SQL = `
    SELECT id, name, description FROM workouts;
    `;
  const response = await client.query(SQL);
  return response.rows;
};

const destroyWorkout = async (id) => {
  const SQL = `
    DELETE FROM workouts WHERE id = $1
    `;
  await client.query(SQL, [id]);
};

const editWorkout = async ({ id, name, description }) => {
  const SQL = `
    UPDATE workouts
    SET name = $1, description = $2
    WHERE id = $3
    RETURNING *;
  `;
  const response = await client.query(SQL, [name, description, id]);
  return response.rows[0];
};

const authenticate = async ({ username, password }) => {
  const SQL = `
    SELECT id, username, password, role FROM users WHERE username=$1
    `;
  const response = await client.query(SQL, [username]);
  if (
    !response.rows.length ||
    !(await bcrypt.compare(password, response.rows[0].password))
  ) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }
  (response);
  const token = jwt.sign(response.rows[0], JWT);
  return { token: token, user: response.rows[0] };
};

const findUserWithToken = async (token) => {
  let id;
  try {
    const payload = jwt.verify(token, JWT);
    id = payload.id;
  } catch (ex) {
    const error = Error("not authorized");
    error.status = 401;
    throw error;
  }

  const SQL = `
    SELECT id, first_name, last_name, email, username, password, role FROM users WHERE id=$1
  `;
  const response = await client.query(SQL, [id]);
  if (!response.rows.length) {
    const error = Error("User not found");
    error.status = 401;
    throw error;
  }
  return response.rows[0];
};

module.exports = {
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
};
