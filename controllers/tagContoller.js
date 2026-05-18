const ApiError = require('../error/ApiError')
const { Tag } = require('../models/Case')

class TagController {
    async getALLTags(req, res, next) {
        const tags = await Tag.findAll()
        return res.json( tags )
    }
}

module.exports = new TagController()