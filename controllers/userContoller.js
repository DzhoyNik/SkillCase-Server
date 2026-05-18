const ApiError = require('../error/ApiError')
const { UserRole, User } = require('../models')

class UserController {
    async getALLUsers(req, res, next) {
        try {
            const data = await User.findAll()
            return res.status(200).json({ message: data })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

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

    async changeRole(req, res, next) {
        try {
            const { userId, userRoleId } = req.body
            const user = await User.findOne({ where: { id: userId }})
            const data = await user.update({ userRoleId: userRoleId })
            return res.status(202).json(data)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new UserController()