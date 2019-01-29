const express = require('express');
const router = express.Router();
const newsSearchRoutes = require('./news');

router.use('/news', newsSearchRoutes);

module.exports = router;
