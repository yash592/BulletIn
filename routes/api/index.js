const express = require('express');
const router = express.Router();
const newsRoutes = require('./news');
const savedNewsRoutes = require('./saved');
const saveUserRoutes = require('./user')
const summaryRoutes = require('./summary');
const newsSearchRoutes = require('./newsSearch');


router.use('/news', newsRoutes);
router.use('/saved', savedNewsRoutes);
router.use('/user', saveUserRoutes);
router.use('/newsSearch', newsSearchRoutes)
// router.use('/summary', summaryRoutes);


module.exports = router;
