const Router = require('express')
const router = new Router()
const userContoller = require('../controllers/userContoller')

router.get('/', userContoller.getALLUsers)
router.get('/role', userContoller.getALLRoles)
router.post('/role', userContoller.createRole)
router.put('/role', userContoller.changeRole)

module.exports = router