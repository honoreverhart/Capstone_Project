const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://Honor:Ephesians4:29@localhost:/capstone_project_db');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const JWT = process.env.JWT || 'shhh';
const jwt = require('jsonwebtoken');

const createTables = async ()=>{
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

const createUser = async({username, password})=>{
    const SQL = `
    
    `
};

const createTrainer = async({username, password})=>{
    
};

const createClient = async()=>{
    
};

const fetchUser = async()=>{
    
};

const fetchTrainer = async()=>{
    
};

const fetchClient = async()=>{
    
};

const destroyClient = async()=>{
    
};

const createWorkout = async()=>{
    
};

const createWorkout_Plan = async()=>{
    
};

const fetchWorkout = async()=>{
    
};

const fetchWorkout_Plan = async()=>{
    
};

const destroyWorkout = async()=>{
    
};

const destroyWorkout_Plan = async()=>{
    
};

const authenticate = async()=>{
    
};

const findUserWithToken = async()=>{
    
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
    findUserWithToken

}