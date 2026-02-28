const { User, UserRole } = require('./User')
const { Student } = require('./Student')
const { Company, Employee } = require('./Company')
const { Case, CaseStatus, CaseDifficulty, CaseRequirement, Tag, CaseTags } = require("./Case")
const { Solution, SolutionStatus } = require("./Solution")
const { Review, AutoCheckResult } = require("./Review")

UserRole.hasOne(User)
User.belongsTo(UserRole)

User.hasOne(Student)
Student.belongsTo(User)

User.hasOne(Employee)
Employee.belongsTo(User)

Company.hasMany(Employee)
Employee.belongsTo(Company)

Company.hasMany(Case)
Case.belongsTo(Company)

CaseStatus.hasMany(Case)
Case.belongsTo(CaseStatus)

CaseDifficulty.hasMany(Case)
Case.belongsTo(CaseDifficulty)

Case.hasMany(CaseRequirement)
CaseRequirement.belongsTo(Case)

Case.hasMany(CaseTags)
CaseTags.belongsTo(Case)

Tag.hasMany(CaseTags)
CaseTags.belongsTo(Tag)

Case.hasMany(Solution)
Solution.belongsTo(Case)

Student.hasMany(Solution)
Solution.belongsTo(Student)

SolutionStatus.hasMany(Solution)
Solution.belongsTo(SolutionStatus)

Solution.hasMany(Review)
Review.belongsTo(Solution)

Employee.hasMany(Review)
Review.belongsTo(Employee)

Solution.hasOne(AutoCheckResult)
AutoCheckResult.belongsTo(Solution)

module.exports = {
    User, UserRole,
    Student,
    Company, Employee,
    Case, CaseStatus, CaseDifficulty, CaseRequirement, Tag, CaseTags,
    Solution, SolutionStatus,
    Review, AutoCheckResult
}