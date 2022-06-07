const express = require('express');
const authController = require('../controllers/auth');
const validator = require('../middlewares/validation');

const router = express.Router();

router.post('/signup', validator.signup, authController.signup);

router.post('/signin', validator.signin, authController.signin);

module.exports = router;