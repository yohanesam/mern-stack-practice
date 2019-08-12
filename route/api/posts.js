const express = require('express');
const router = express.Router();

// @route   GET api/Post
// @desc    Test route
// @acess   Public
router.get('/', (req, res) => res.send('Post Route'));

module.exports = router;