module.exports = async (req, res, next) => {
    if(req.session.currentUser) {
        next();
    } else {
        res.sendStatus(403);
    }
}