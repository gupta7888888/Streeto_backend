// routes/storeRoutes.js
const express = require('express');
const router = express.Router();
const { createStore, getMyStore } = require('../../controllers/store/storeController');
const  protect  = require('../../middlewares/auth/authMiddleware');

router.post('/', protect, createStore);
router.get('/mine', protect, getMyStore);

module.exports = router;
