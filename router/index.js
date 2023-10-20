const Router = require('express').Router
const userController = require('../controllers/user-contoller')
const applicationController = require('../controllers/application-controller')
const router = new Router()
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware')

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 5, max:32}),
    userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activation/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)
router.post('/application/create', applicationController.create)
router.post('/application/approve', applicationController.approve)
router.post('/application/refuse', applicationController.refuse)
router.post('/application/checkStatus', applicationController.check)

module.exports = router