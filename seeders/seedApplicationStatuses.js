const { ApplicationStatus } = require('../models/Company')

module.exports = async () => {
    await ApplicationStatus.findOrCreate({ where: { status: "Отправлена" } })
    await ApplicationStatus.findOrCreate({ where: { status: "Одобрена" } })
    await ApplicationStatus.findOrCreate({ where: { status: "Отклонена" } })
}