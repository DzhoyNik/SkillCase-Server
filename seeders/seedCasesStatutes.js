const { CaseStatus } = require('../models/Case')

module.exports = async () => {
    await CaseStatus.findOrCreate({ where: { status: "Принят" } })
    await CaseStatus.findOrCreate({ where: { status: "В процессе" } })
    await CaseStatus.findOrCreate({ where: { status: "Отказан" } })
}