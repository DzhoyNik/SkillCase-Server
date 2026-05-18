const Router = require('express')
const router = new Router()
const companyContoller = require('../controllers/companyContoller')

router.get('/', companyContoller.getALLApplications)
router.get('/:userId', companyContoller.findApplication)
router.post('/', companyContoller.sendApplication)
router.get('/info/:userId', companyContoller.getCompanyInfo)
router.post('/:appId', companyContoller.acceptApplication)
router.delete('/:appId', companyContoller.rejectApplication)
router.get('/:companyId/cases', companyContoller.getAllCases)
router.get('/:companyId/case/:caseId', companyContoller.getCase)
router.get('/check/:userId', companyContoller.checkCompany)
router.get('/stats/:companyId', companyContoller.getStatsCompany)
router.delete('/case/:caseId', companyContoller.deleteCase)

module.exports = router