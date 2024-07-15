const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnect");

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Retrieve environment variables
const PORT = process.env.PORT || 4000;
const hostName = process.env.HOST_NAME || "127.0.0.4";

// Verify environment variables
console.log(`PORT: ${PORT}`);
console.log(`HostName: ${hostName}`);


// Database Connection
dbConnect();


// demo api
app.get("/", (req, res) => {
    res.send("<h1>Hello, I am Personal Expense Tracker API is running</h1>");
});

// Start server
app.listen(PORT, hostName, () => {
    console.log(`Server running at http://${hostName}:${PORT}`);
});