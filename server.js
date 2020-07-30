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
    origin: ["https://ancient-eyrie-01792.herokuapp.com", "http://localhost:3000"],
    credentials: true,
}
app.use(cors(corsOptions));
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json()); // To accept JSON data


// middleware - API routes
app.use(
    session({
        store: new MongoStore ({
            url: 'mongodb+srv://Pavaloz:L4Z3MBg0C740Dfsp@pablocluster.kfwtr.mongodb.net/store_lib?retryWrites=true&w=majority'
        }),
        secret: "Secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 * 2,
        },
    })
);
app.use("/api/v1/posts", routes.posts);
app.use("/api/v1/auth", routes.auth);



// connection

app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
});

