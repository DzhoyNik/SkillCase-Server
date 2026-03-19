const ApiError = require('../error/ApiError')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User, UserRole, Student, Company, Employee } = require('../models')

const generateJwt = (id, lastName, firstName, patronymic, email, role) => {
    return jwt.sign(
        {
            id: id,
            lastName: lastName,
            firstName: firstName,
            patronymic: patronymic,
            email: email,
            role: role
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
            const { surname, name, patronymic, email, password } = req.body

            if (!surname || !name || !patronymic || !email || !password) {
                return next(ApiError.badRequest("Заполните все поля!"))
            }

            const candidate = await User.findOne({ where: {email} })

            if (candidate) {
                return next(ApiError.badRequest("Пользователь с таким email уже существует!"))
            }

            const hashPassword = await bcrypt.hash(password, 5)

            const user = await User.create({
                lastName: surname,
                firstName: name,
                patronymic,
                email,
                password: hashPassword,
                userRoleId: 1
            })

            const token = generateJwt( user.id, user.lastName, user.firstName, user.patronymic, user.email, user.userRoleId )

            return res.json({ token })
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async singIn(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ where: { email } })

            if (!user) {
                return next(ApiError.badRequest("Пользователь не найден!"))
            }

            let comparePassword = await bcrypt.compare(password, user.password)

            if (!comparePassword) {
                return next(ApiError.badRequest("Указан неверный пароль"))
            }

            const token = generateJwt( user.id, user.lastName, user.firstName, user.patronymic, user.email, user.userRoleId )

            return res.json({ token })
        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }
    }

    async check(req, res, next) {
        const token = generateJwt( req.user.id, req.user.lastName, req.user.firstName, req.user.patronymic, req.user.email, req.user.userRoleId )
        return res.json({ token })
    }
}

module.exports = new AuthController()