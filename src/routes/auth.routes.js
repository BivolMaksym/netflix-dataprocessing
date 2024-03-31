const express = require('express');
const AuthController = require('../controller/auth.controller');

const router = express.Router();
const authController = new AuthController();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/protected', authController.protected);
router.post('/updateRole', authController.updateRole);

module.exports = router;