const Router = require('express')
const router = new Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/sign-up', authController.signUp)
router.post('/sign-in', authController.singIn)
router.get('/', authMiddleware, authController.check)

module.exports = router