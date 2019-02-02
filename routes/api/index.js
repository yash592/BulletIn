const express = require('express');
const router = express.Router();
const newsSearchRoutes = require('./news');
const savedNewsRoutes = require('./saved')

router.use('/news', newsSearchRoutes);
router.use('/saved', savedNewsRoutes)

module.exports = router;
