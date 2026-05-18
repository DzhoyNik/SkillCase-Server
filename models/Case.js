const sequelize = require("../database/postgre")
const { DataTypes } = require("sequelize")

const Case = sequelize.define("case", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT('medium'), allowNull: true },
    points: { type: DataTypes.INTEGER, allowNull: false }
})

const CaseStatus = sequelize.define("caseStatus", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.STRING, unique: true, allowNull: false }
})

const CaseDifficulty = sequelize.define("caseDifficulty", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    difficulty: { type: DataTypes.STRING, unique: true, allowNull: false }
})

const CaseRequirement = sequelize.define("caseRequirement", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    requirement: { type: DataTypes.TEXT('medium'), allowNull: false },
    sequence: { type: DataTypes.INTEGER, allowNull: false },
})

const Tag = sequelize.define("tag", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tag: { type: DataTypes.STRING, allowNull: false },
    isSystem: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false }
})

const CaseTags = sequelize.define("caseTags", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

module.exports = {
    Case,
    CaseStatus,
    CaseDifficulty,
    CaseRequirement,
    Tag,
    CaseTags
}