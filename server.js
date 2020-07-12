// imports
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const PORT = process.env.PORT || 3001;
const app = express();

// middleware - JSON Parsing
let corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
}
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json()); // To accept JSON data


// middleware - API routes
app.use(
    session({
        store: new MongoStore ({
            url: 'mongodb://localhost:27017/storelib'
        }),
        secret: "Secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            sameSite: true,
            maxAge: 1000 * 60 * 60 * 24 * 7 * 2,
            secure: false,
        },
    })
);
app.use("/api/v1/posts", routes.posts);
app.use("/api/v1/auth", routes.auth);



// connection

app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
});

