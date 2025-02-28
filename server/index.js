const express = require('express');
const app = express();
app.use(express.json());

const path = require('path');
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../client/Capstone_Project/dist/index.html')));
app.use('/assets', express.static(path.join(__dirname, '../client/Capstone_Project/dist/assets')));

//middleware

//REST