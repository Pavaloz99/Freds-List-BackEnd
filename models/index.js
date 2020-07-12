const mongoose = require("mongoose");

const connectionString = 
    "mongodb://localhost:27017/storelib";




mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
.then(() => console.log("MongoDB successfully connected..."))
.catch(err => console.log(`MongoDB connection error ${err}`));

module.exports = {
    User: require('./User'),
    Chat: require('./Chat'),
    Post: require('./Post'),
    Watchlist: require('./Watchlist'),
}