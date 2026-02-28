const sequelize = require("../database/postgre")
const { DataTypes } = require("sequelize")

const Case = sequelize.define("case", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT('medium'), allowNull: true }
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
    requirement: { type: DataTypes.TEXT('medium'), allowNull: false }
})

const Tag = sequelize.define("tag", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    type: { type: DataTypes.STRING, allowNull: false },
    tag: { type: DataTypes.STRING, allowNull: false }
    },
    {
        indexes: [
            {
                unique: true,
                fields: ["type", "tag"]
            }
        ]
    }
)

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