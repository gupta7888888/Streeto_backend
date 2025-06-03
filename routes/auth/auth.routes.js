// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const AuthController = require('../../controllers/auth/authController');
const { registerValidator, loginValidator } = require('../../validators/auth/authValidators');
const handleValidationErrors = require('../../middlewares/validation/handleValidationErrors.js');



router.post('/register', registerValidator, handleValidationErrors, AuthController.register);
router.post('/login', loginValidator, handleValidationErrors, AuthController.login);

module.exports = router;
