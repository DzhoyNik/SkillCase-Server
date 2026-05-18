const ApiError = require('../error/ApiError')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User, UserRole, Student, Company, Employee } = require('../models')
const { UserStats } = require('../models/User')

const generateJwt = (id, lastName, firstName, patronymic, level, xp, login, email, userRoleId) => {
    return jwt.sign(
        {
            id: id,
            lastName: lastName,
            firstName: firstName,
            patronymic: patronymic,
            level: level,
            xp: xp,
            login: login,
            email: email,
            role: userRoleId
        },
        process.env.SECRET_KEY,
        {
            expiresIn: '24h'
        }
    )
}

class AuthController {
    async signUp(req, res, next) {
        try {
            const { lastName, firstName, patronymic, login, email, password } = req.body

            if (!lastName || !firstName || !patronymic || !login || !email || !password) {
                return next(ApiError.badRequest("Заполните все поля!"))
            }

            const candidate = await User.findOne({ where: {email} })

            if (candidate) {
                return next(ApiError.badRequest("Пользователь с таким email уже существует!"))
            }

            const hashPassword = await bcrypt.hash(password, 5)
            const userRoleId = 1

            const user = await User.create({
                lastName: lastName,
                firstName: firstName,
                patronymic,
                login: login,
                email,
                password: hashPassword,
                userRoleId: userRoleId
            })

            const userStats = await UserStats.create({
                userId: user.id
            })

            const token = generateJwt( user.id, user.lastName, user.firstName, user.patronymic, userStats.level, userStats.xp, user.login, user.email, user.userRoleId )

            return res.json({ token })
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async singIn(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ where: { email } })
            const userStats = await UserStats.findOne({ where: { userId: user.id } })

            if (!user) {
                return next(ApiError.badRequest("Пользователь не найден!"))
            }

            let comparePassword = await bcrypt.compare(password, user.password)

            if (!comparePassword) {
                return next(ApiError.badRequest("Указан неверный пароль"))
            }

            const token = generateJwt( user.id, user.lastName, user.firstName, user.patronymic, userStats.level, userStats.xp, user.login, user.email, user.userRoleId )

            return res.json({ token })
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async check(req, res, next) {
        const token = generateJwt( req.user.id, req.user.lastName, req.user.firstName, req.user.patronymic, req.user.level, req.user.xp, req.user.login, req.user.email, req.user.role )
        return res.json({ token: token, msg: req.user })
    }
}

module.exports = new AuthController()