const ApiError = require('../error/ApiError')
const { Case, CaseTags, Tag } = require('../models/Case')

class CaseController {
    async create(req, res, next) {
        try {
            const { title, description, companyId, caseStatusId, caseDifficultyId, points, tags } = req.body
            const data = await Case.create({ title, description, companyId, caseStatusId, caseDifficultyId, points })

            tags.map( async tag => await CaseTags.create({ caseId: data.id, tagId: tag }))

            return res.json(data)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        const { caseId } = req.params
        const { title, description, companyId, caseStatusId, caseDifficultyId, points, tags } = req.body

        const data = await Case.update({ title, description, companyId, caseStatusId, caseDifficultyId, points }, { where: { id: caseId } })
        await CaseTags.destroy({ where: { caseId: caseId } })
        tags.map( async tag => await CaseTags.create({ caseId: caseId, tagId: tag }))

        return res.json(data)
    }

    async getTagsCase(req, res, next) {
        try {
            const { caseId } = req.params
            
            const tags = await CaseTags.findAll({
                where: { caseId },
                include: {
                    model: Tag,
                    attributes: [ 'id', 'tag' ]
                }
            })
            
            const result = tags.map( item => item.tag )
            return res.json( result )
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getALLCases(req, res, next) {
        try {
            const data = await Case.findAll()
            return res.status(200).json(data)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new CaseController()