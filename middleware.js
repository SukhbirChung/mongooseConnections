const mongoose = require('mongoose');
const AppError = require('./errorHandling/AppError');
const db_url = process.env.REGISTERLOGIN_DB_URL;

module.exports.connectToDB = async (req, res, next) => {
    try {
        await mongoose.connect(db_url);
        next();
    }
    catch (err) {
        next(new AppError(500, "Couldn't connect to the database."));
    }
}

module.exports.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        return next(new AppError(401, "Couldn't authenticate user."));
    }
}