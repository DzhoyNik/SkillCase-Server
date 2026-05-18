const { UserRole } = require('../models/User')

module.exports = async () => {
    await UserRole.findOrCreate({ where: { role: "Начинающий специалист" } })
    await UserRole.findOrCreate({ where: { role: "Эксперт" } })
    await UserRole.findOrCreate({ where: { role: "Руководитель" } })
    await UserRole.findOrCreate({ where: { role: "Администратор" } })
}