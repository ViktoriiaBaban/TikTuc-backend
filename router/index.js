const Router = require('express').Router
const userRoutes = require('./user/user-routes');
const applicationRoutes = require('./application/application-routes');
const router = new Router()
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware')


router.use('/auth', userRoutes)
router.use('/application', applicationRoutes)

module.exports = router