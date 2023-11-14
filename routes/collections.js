const express = require('express');
const { connectToDB, isAuthenticated } = require('../middleware');
const collections = require('../controllers/collections');

const router = express.Router({ mergeParams: true });

router.post('/addToCollection', connectToDB, isAuthenticated, collections.addToCollection);

module.exports = router;