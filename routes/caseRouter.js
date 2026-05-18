const Router = require('express')
const caseContoller = require('../controllers/caseContoller')
const router = new Router()

router.get('/', caseContoller.getALLCases)
router.get('/:caseId', caseContoller.getTagsCase)
router.post('/', caseContoller.create)
router.put('/:caseId', caseContoller.update)

module.exports = router