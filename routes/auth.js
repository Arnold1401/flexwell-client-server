const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/register', authController.registerCustomer);
router.post('/login', authController.loginCustomer);

module.exports = router;
