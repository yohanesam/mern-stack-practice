const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// @route   GET api/Auth
// @desc    Test route
// @acess   Public
router.get('/', (req, res) => res.send('Auth Route'));

module.exports = router;