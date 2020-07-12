const mongoose  = require("mongoose");
const Schema = mongoose.Schema;

const watchlistSchema = new Schema({
    User : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }],
});

const Watchlist = mongoose.model("Watchlist", watchlistSchema);

module.exports = Watchlist;