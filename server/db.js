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
    DROP TABLE IF EXISTS workouts;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS assigned_workouts;
    CREATE TABLE users(
        id UUID PRIMARY KEY,
        first_name VARCHAR (255) NOT NULL,
        last_name VARCHAR (255) NOT NULL,
        email VARCHAR (255) NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR (255) NOT NULL,
        role ENUM('trainer', 'client') NOT NULL,
    );

    CREATE TABLE workouts(
        id SERIAL PRIMARY KEY,
        name VARCHAR(20) NOT NULL,
        description VARCHAR(500) NOT NULL,
    );

    CREATE TABLE assigned_workouts(
        workout_id UUID REFERENCES workouts(id) NOT NULL,
        user_id UUID REFERENCES users(id) NOT NULL
    )


    `;
  await client.query(SQL);
};

const createUser = async ({ first_name, last_name, email, username, password }) => {
  const SQL = `
    INSERT INTO users(id, first_name, last_name, email, username, password) VALUES($1, $2, $3, $4, $5, $6) RETURNING *
    `;
  const response = await client.query(SQL, [
    uuid.v4(),
    first_name,
    last_name, 
    email,
    username,
    await bcrypt.hash(password, 5),
  ]);
  return response.rows[0];
};

const fetchUser = async () => {
  const SQL = `
    SELECT id, username FROM users;
    `;
  const response = await client.query(SQL);
  return response.rows;
};

const createWorkout = async (name, description) => {
  const SQL = `
    INSERT INTO users(id, name, description) VALUES($1, $2, $3) RETURNING *
    `;
  const response = await client.query(SQL, [uuid.v4(), name, description]);
  return response.rows[0];
};

const fetchWorkout = async () => {
  const SQL = `
    SELECT id, name, description FROM users;
    `;
  const response = await client.query(SQL);
  return response.rows;
};

const destroyWorkout = async (id) => {
    const SQL =`
    DELETE FROM workouts WHERE id = $1
    `;
    await client.query(SQL, [id]);
};

const assignWorkout = async(workout_id, user_id) => {
    const SQL =`
    INSERT INTO assigned_Workouts(workout_id, user_id) VALUES($1, $2) RETURNING *
    `;
    const response = await client.query(SQL, [workout_id, user_id]);
    return response.rows[0];
}

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
  fetchUser,
  createWorkout,
  fetchWorkout,
  destroyWorkout,
  assignWorkout,
  authenticate,
  findUserWithToken,
};
