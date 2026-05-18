const sequelize = require('../database/postgre')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    lastName: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    patronymic: { type: DataTypes.STRING, allowNull: false },
    login: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
})

const UserRole = sequelize.define('userRole', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    role: { type: DataTypes.STRING, unique: true, allowNull: false }
})

const UserStats = sequelize.define('userStats', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    level: { type: DataTypes.INTEGER, defaultValue: 1, allowNull: false },
    xp: { type: DataTypes.INTEGER, defaultValue: 0, allowNull: false }
})

const UserInfo = sequelize.define('userInfo', {
    about: { type: DataTypes.TEXT, allowNull: true },
    education: { type: DataTypes.STRING, allowNull: true }
})

const UserLinks = sequelize.define('userLinks', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING, allowNull: false },
    url: { type: DataTypes.STRING, allowNull: false }
})

module.exports = {
    User,
    UserRole,
    UserStats,
    UserInfo,
    UserLinks
}