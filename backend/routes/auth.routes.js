const login_func = require('../controllers/auth.controller.js').login;
const express = require('express');
const router = express.Router();

router.post('/login', login_func);

module.exports = router;