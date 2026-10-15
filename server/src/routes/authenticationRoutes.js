const express = require('express');
const router = express.Router();
const {registerUser, loginUser} = require('../controllers/authenticationController');

// POST
router.post('/register', registerUser);

// POST
router.post('/login', loginUser);

module.exports = router;
