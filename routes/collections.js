const express = require('express');
const { connectToDB, isAuthenticated } = require('../middleware');
const collections = require('../controllers/collections');

const router = express.Router({ mergeParams: true });

router.post('/addToCollection', connectToDB, isAuthenticated, collections.addToCollection);

router.get('/getUserCollection', connectToDB, isAuthenticated, collections.getUserCollection);

module.exports = router;