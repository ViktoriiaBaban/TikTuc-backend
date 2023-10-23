const applicationController = require("../../controllers/application/application-controller");
const Router = require('express').Router

const router = new Router()

router.post('/create', applicationController.create)
router.post('/approve', applicationController.approve)
router.post('/refuse', applicationController.refuse)
router.post('/checkStatus', applicationController.check)

module.exports = router;