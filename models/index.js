const mongoose = require("mongoose");

const connectionString = 
    "mongodb+srv://Pavaloz:L4Z3MBg0C740Dfsp@pablocluster.kfwtr.mongodb.net/store_lib?retryWrites=true&w=majority";




mongoose.connect(process.env.MONGOLAB_WHITE_URI || connectionString, {
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