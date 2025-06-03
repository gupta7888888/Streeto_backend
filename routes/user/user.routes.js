const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middlewares/auth/authMiddleware');
const UserController = require('../../controllers/user/userController');

router.get('/profile', authMiddleware, UserController.getProfile);

module.exports = router;
