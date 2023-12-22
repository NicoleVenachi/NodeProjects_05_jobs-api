
// *** imports ***

const express = require('express');

const { login, register } = require('../controllers/auth');

// *** inicializo router ***
const router = express.Router();

// *** Routing ***

router.post('/register', register);
router.get('/login', login);


module.exports = router;
