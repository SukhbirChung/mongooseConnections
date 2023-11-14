const express = require('express');
const { connectToDB, isAuthenticated } = require('../middleware');
const users = require('../controllers/users');

const router = express.Router({ mergeParams: true });

router.post('/', connectToDB, isAuthenticated, (req, res) => {
    res.send(req.user);
});

router.post('/signup', connectToDB, users.registerUser, users.authenticateAndLogin, (req, res) => {
    res.send(req.user);
});

router.post('/login', connectToDB, users.authenticateAndLogin, (req, res) => {
    res.send(req.user);
});

router.post('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(new AppError(500, "Couldn't log out."));
        }
        res.send('Successfully logged out.');
    });
})

module.exports = router;