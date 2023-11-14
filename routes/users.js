const express = require('express');
const { connectToDB, isAuthenticated } = require('../middleware');
const users = require('../controllers/users');

const router = express.Router({ mergeParams: true });

router.post('/', connectToDB, isAuthenticated, (req, res) => {
    res.send(req.user.username);
});

router.post('/signup', connectToDB, users.registerUser, users.authenticateAndLogin, (req, res) => {
    res.send("Account created successfully.");
});

router.post('/login', connectToDB, users.authenticateAndLogin, (req, res) => {
    res.send("welcome! Logged in successfully.");
});

router.post('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(new AppError(500, "Couldn't log out."));
        }
        res.send('Logged out successfully.');
    });
})

module.exports = router;