
// *** imports ***

const express = require('express');

const { login, register } = require('../controllers/auth');

// *** inicializo router ***
const router = express.Router();

// *** Routing ***

router.get('/register', register);
router.post('/login', login);


module.exports = router;
