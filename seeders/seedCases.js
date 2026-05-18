const { Case } = require('../models/Case')

module.exports = async () => {
    await Case.findOrCreate({ where: {
        title: 'Кейс от компании «Яндекс»',
        description: 'Разработайте интерфейс сервиса для анализа данных пользователей и предложите улучшения UX.',
        companyId: null,
        caseStatusId: 1,
        caseDifficultyId: 1,
        points: 100
    }})
}