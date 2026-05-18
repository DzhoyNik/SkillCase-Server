const { CaseDifficulty } = require('../models/Case')

module.exports = async () => {
    await CaseDifficulty.findOrCreate({ where: { difficulty: "Easy" } })
    await CaseDifficulty.findOrCreate({ where: { difficulty: "Medium" } })
    await CaseDifficulty.findOrCreate({ where: { difficulty: "Hard" } })
}