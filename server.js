// imports
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const app = express();

// middleware - JSON Parsing
app.use(express.json()); // To accept JSON data
app.use(cors());

// middleware - API routes



// connection

app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
});

