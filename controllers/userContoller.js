const ApiError = require('../error/ApiError')
const { UserRole } = require('../models')

class UserController {
    async getALLRoles(req, res, next) {
        try {
            const data = await UserRole.findAndCountAll()
            return res.status(200).json({ message: data })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async createRole(req, res, next) {
        const { role } = req.body

        try {
            const data = await UserRole.create({ role: role })
            return res.status(201).json({ message: data })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new UserController()