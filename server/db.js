const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://Honor:Ephesians4:29@localhost:/capstone_project_db');
const uuid = require('uuid');
const bcrypt = require('bcript');
const JWT = process.env.JWT || 'shhh';
const jwt = require('jsonwebtoken');