// server.js

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRoutes = require("./routes/authRoutes")
const workspace = require("./routes/workspaceRoutes")
const videoRoutes  = require("./routes/videoRoutes")
const profile = require("./routes/profile")
require('dotenv').config();
app.use(express.json()); // For parsing application/json
const database = require("./config/database")
app.use(cookieParser());

const port = 5000;
database.connect();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors({
    origin: "https://streamline-yt.netlify.app",
    credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/workspace',workspace);
app.use('/api/videos', videoRoutes);
app.use('/api/profile', profile);
app.get("/", (req, res) => {
    res.send("Welcome to the server");
});
// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
