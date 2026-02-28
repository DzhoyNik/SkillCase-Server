const sequelize = require("../database/postgre")
const { DataTypes } = require("sequelize")

const Review = sequelize.define("review", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    score: { type: DataTypes.INTEGER, allowNull: false },
    decision: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    comment: { type: DataTypes.TEXT('medium'), allowNull: true }
})

const AutoCheckResult = sequelize.define("autoCheckResult", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    isWork: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    syntaxError: { type: DataTypes.STRING, allowNull: true },
    isPlagiarism: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    strengths: { type: DataTypes.TEXT('medium'), allowNull: true },
    weaknesses: { type: DataTypes.TEXT('medium'), allowNull: true },
})

module.exports = {
    Review,
    AutoCheckResult
}