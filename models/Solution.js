const sequelize = require("../database/postgre")
const { DataTypes } = require("sequelize")

const Solution = sequelize.define("solution", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

const SolutionAttempt = sequelize.define("solutionAttempt", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    attempt: { type: DataTypes.INTEGER, allowNull: false },
})

const SolutionAttemptStatus = sequelize.define("solutionAttemptStatus", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const SolutionFile = sequelize.define("solutionFile", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.STRING, allowNull: false },
})

const SolutionFileType = sequelize.define("solutionFileType", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING, unique: true, allowNull: false },
})

module.exports = {
    Solution,
    SolutionAttempt,
    SolutionAttemptStatus,
    SolutionFile,
    SolutionFileType
}