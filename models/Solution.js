const sequelize = require("../database/postgre")
const { DataTypes } = require("sequelize")

const Solution = sequelize.define("solution", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    attempt: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT("long"), allowNull: false }
})

const SolutionStatus = sequelize.define("solutionStatus", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.STRING, unique: true, allowNull: false },
})

module.exports = {
    Solution,
    SolutionStatus
}