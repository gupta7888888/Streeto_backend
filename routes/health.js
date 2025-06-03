const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ status: 'Server is healthy!' });
});

module.exports = router;
