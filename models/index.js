const { User, UserRole, UserStats, UserInfo, UserLinks } = require('./User')
const { Application, ApplicationStatus, ApplicationDecision, Company, Employee } = require('./Company')
const { Case, CaseStatus, CaseDifficulty, CaseRequirement, Tag, CaseTags } = require("./Case")
const { Solution, SolutionAttempt, SolutionAttemptStatus, SolutionFile, SolutionFileType } = require("./Solution")
const { Review } = require("./Review")

UserRole.hasMany(User)
User.belongsTo(UserRole)

User.hasOne(UserStats)
UserStats.belongsTo(User)

User.hasOne(UserInfo)
UserInfo.belongsTo(User)

User.hasMany(UserLinks)
UserLinks.belongsTo(User)

Company.hasMany(Employee)
Employee.belongsTo(Company)

User.hasMany(Employee)
Employee.belongsTo(User)

User.hasMany(Application)
Application.belongsTo(User)

User.hasMany(ApplicationDecision)
ApplicationDecision.belongsTo(User)

Application.hasMany(ApplicationDecision)
ApplicationDecision.belongsTo(Application)

ApplicationStatus.hasMany(ApplicationDecision)
ApplicationDecision.belongsTo(ApplicationStatus)

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

User.hasMany(Solution)
Solution.belongsTo(User)

Case.hasMany(Solution)
Solution.belongsTo(Case)

Solution.hasMany(SolutionAttempt)
SolutionAttempt.belongsTo(Solution)

SolutionAttemptStatus.hasMany(SolutionAttempt)
SolutionAttempt.belongsTo(SolutionAttemptStatus)

SolutionAttempt.hasMany(SolutionFile)
SolutionFile.belongsTo(SolutionAttempt)

SolutionFileType.hasMany(SolutionFile)
SolutionFile.belongsTo(SolutionFileType)

SolutionAttempt.hasMany(Review)
Review.belongsTo(SolutionAttempt)

Employee.hasMany(Review)
Review.belongsTo(Employee)

module.exports = {
    User, UserRole, UserStats, UserLinks,
    Application, ApplicationDecision, ApplicationStatus, Company, Employee,
    Case, CaseStatus, CaseDifficulty, CaseRequirement, Tag, CaseTags,
    Solution, SolutionAttempt, SolutionAttemptStatus, SolutionFile, SolutionFileType,
    Review
}