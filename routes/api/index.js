const express = require('express');
const router = express.Router();
const newsSearchRoutes = require('./news');
const savedNewsRoutes = require('./saved');
const saveUserRoutes = require('./user')

router.use('/news', newsSearchRoutes);
router.use('/saved', savedNewsRoutes);
router.use('/user', saveUserRoutes)


module.exports = router;
