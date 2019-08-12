const express = require('express');
const router = express.Router();

// @route   GET api/Profile
// @desc    Test route
// @acess   Public
router.get('/', (req, res) => res.send('Profile Route'));

module.exports = router;