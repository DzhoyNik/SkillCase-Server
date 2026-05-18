const sequelize = require('../database/postgre')
const { DataTypes } = require('sequelize')

const Application = sequelize.define('application', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT('medium'), allowNull: false },
    sphere: { type: DataTypes.STRING, allowNull: false },
    inn: { type: DataTypes.STRING, allowNull: false },
    ogrn: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true },
    site: { type: DataTypes.STRING, allowNull: true },
})

const ApplicationStatus = sequelize.define('applicationStatus', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.STRING, allowNull: false }
})

const ApplicationDecision = sequelize.define('applicationDecision', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const Company = sequelize.define('company', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.TEXT('long'), allowNull: true },
    sphere: { type: DataTypes.STRING, allowNull: false },
    inn: { type: DataTypes.STRING, allowNull: false },
    ogrn: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: true },
    site: { type: DataTypes.STRING, allowNull: true }
})

const Employee = sequelize.define('employee', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

module.exports = {
    Application,
    ApplicationStatus,
    ApplicationDecision,
    Company,
    Employee
}