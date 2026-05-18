const ApiError = require('../error/ApiError')
const { Application, ApplicationDecision, Company, Employee, User, Case, CaseTags, Tag } = require('../models')

class CompanyController {
    async sendApplication(req, res, next) {
        const { title, description, sphere, inn, ogrn, email, site, employee, post, userId } = req.body
        
        try {
            const applicationData = {
                title: title,
                description: description,
                sphere: sphere,
                inn: inn,
                ogrn: ogrn,
                email: email,
                site: site,
                userId: userId
            }

            const application = await Application.create(applicationData)
            
            
            const applicationDecisionData = {
                userId: null,
                applicationId: application.id,
                applicationStatusId: 1
            }

            const applicationDecision = await ApplicationDecision.create(applicationDecisionData)

            return res.json({ application, applicationDecision })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async findApplication(req, res, next) {
        const { userId } = req.params

        const application = await Application.findOne({ where: { userId: userId } })

        if (application) return res.json(true)
        
        return res.json(false)
    }

    async acceptApplication(req, res, next) {
        try {
            const { appId } = req.params
    
            const { title, description, sphere, inn, ogrn, email, site, userId } = await Application.findOne({ where: { id: appId } })
            
            const company = await Company.create({
                name: title,
                description: description,
                sphere: sphere,
                inn: inn,
                ogrn: ogrn,
                email: email,
                site: site
            })

            const employee = await Employee.create({
                userId: userId,
                companyId: company.id
            })

            const user = await User.update({ userRoleId: 3 }, { where: { id: userId } })

            await Application.destroy({ where: { id: appId} })
    
            return res.json({ company, employee, user })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async rejectApplication(req, res, next) {

    }

    async getALLApplications(req, res, next) {
        try {
            const applications = await Application.findAll()
            return res.json({ applications })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getCompanyInfo(req, res, next) {
        const { userId } = req.params
        const employee = await Employee.findOne({ where: { userId: userId } })
        const company = await Company.findOne({ where: { id: employee.companyId } })
        return res.json({ company })
    }

    async getAllCases(req, res, next) {
        const { companyId } = req.params
        const cases = await Case.findAll({ where: { companyId: companyId } })
        return res.json( cases )
    }

    async getCase(req, res, next) {
        const { companyId, caseId } = req.params
        const _case = await Case.findOne({ where: { id: caseId, companyId: companyId } })
        const tags = await CaseTags.findAll({
            where: { caseId: caseId },
            attributes: [],
            include: [{
                model: Tag,
                attributes: ['id', 'tag']
            }] })
        return res.json({ item: _case, tags: tags })
    }

    async getStatsCompany(req, res, next) {
        const { companyId } = req.params
        const cases = await Case.findAndCountAll({ where: { companyId: companyId } })
        return res.json( cases )
    }

    async checkCompany(req, res, next) {
        const { userId } = req.params
        const employee = await Employee.findOne({ where: { userId: userId } })
        const company = await Company.findOne({ where: { id: employee.companyId } })
        return res.json({ company })
    }

    async deleteCase(req, res, next) {
        const { caseId } = req.params

        try {
            const delCase = await Case.destroy({ where: { id: caseId } })
            const delTags = await CaseTags.destroy({ where: { caseId: caseId } })
            return res.json({ delCase, delTags })
        } catch (err) {
            next(ApiError.badRequest(err.message))
        }
    }
}

module.exports = new CompanyController()