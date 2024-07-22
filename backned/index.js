// server.js

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const authRoutes = require("./routes/authRoutes")
require('dotenv').config();
app.use(express.json()); // For parsing application/json
const database = require("./config/database")

const port = 5000;
database.connect();
app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to the server");
});
// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
