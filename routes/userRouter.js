const Router = require('express')
const router = new Router()
const userContoller = require('../controllers/userContoller')

router.get('/role', userContoller.getALLRoles)
router.post('/role', userContoller.createRole)

module.exports = router