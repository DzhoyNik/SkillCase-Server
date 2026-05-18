const Router = require('express')
const tagContoller = require('../controllers/tagContoller')
const router = new Router()

router.get('/', tagContoller.getALLTags)

module.exports = router