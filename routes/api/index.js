const express = require('express');
const router = express.Router();
const newsRoutes = require('./news');
const savedNewsRoutes = require('./saved');
const saveUserRoutes = require('./user')
const newsSearchRoutes = require('./newsSearch');
const userDeleteRoutes = require('./userDelete')


router.use('/news', newsRoutes);
router.use('/saved', savedNewsRoutes);
router.use('/user', saveUserRoutes);
router.use('/newsSearch', newsSearchRoutes)
router.use('/userDelete', userDeleteRoutes)



module.exports = router;
