const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('../databaseModels/user');
const AppError = require('../errorHandling/AppError');

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports.registerUser = async (req, res, next) => {
    let { email, username, password } = req.body;
    username = username.toLowerCase();

    const newUser = new User({ email, username });

    try {
        await User.register(newUser, password);
        next();
    }
    catch (err) {
        if (err.message.includes('email:')) {
            err.message = 'There is already an account registered with this email.';
        }
        next(new AppError(500, err.message));
    }
}

module.exports.authenticateAndLogin = (req, res, next) => {
    req.body.username = (req.body.username).toLowerCase();

    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(new AppError(500, "Couldn't authenticate the user."));
        }
        if (info) {
            return next(new AppError(500, info.message));
        }
        req.login(user, err => {
            if (err) {
                return next(new AppError(500, "Couldn't log in."));
            }
            next();
        })
    })(req, res, next);
}