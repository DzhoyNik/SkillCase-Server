const sequelize = require('../database/postgre')
const { DataTypes } = require('sequelize')

const Company = sequelize.define('company', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.TEXT('long'), allowNull: true },
    sphere: { type: DataTypes.STRING, allowNull: false }
})

const Employee = sequelize.define('employee', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

module.exports = {
    Company,
    Employee
}