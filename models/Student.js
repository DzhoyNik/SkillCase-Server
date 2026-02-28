const sequelize = require('../database/postgre')
const { DataTypes } = require('sequelize')

const Student = sequelize.define('student', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    group: { type: DataTypes.STRING, allowNull: false },
    studentCardNumber: { type: DataTypes.STRING, unique: true, allowNull: false }
})

module.exports = {
    Student
}