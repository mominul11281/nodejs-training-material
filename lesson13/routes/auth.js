const express = require('express');
const authController = require('../controllers/auth');
const validator = require('../middlewares/validation');

const router = express.Router();

router.post('/signup', validator.signup, authController.signup);

router.post('/signin', validator.signin, authController.signin);

router.post(
    '/send-reset-password-mail',
    validator.resetPasswordMail,
    authController.sendResetPasswordMail
);

router.post(
    '/reset-password',
    validator.resetPassword,
    authController.resetPassword
);

// router.post('/verify-email/:token')

module.exports = router;
