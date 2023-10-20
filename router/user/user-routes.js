const Router = require('express').Router
const userController = require('../../controllers/user/user-contoller')
const {body} = require("express-validator");
const authMiddleware = require("../../middlewares/auth-middleware");

const router = new Router()

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 5, max:32}),
    userController.registration)
router.post('/login',
    body('email').isEmail(),
    body('password').isLength({min: 5, max:32}),
    userController.login)
router.post('/logout',
    body('email').isEmail(),
    userController.logout)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)

module.exports = router;