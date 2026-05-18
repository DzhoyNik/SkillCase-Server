require('dotenv').config()
const express = require('express')
const postgre = require('./database/postgre')
const models = require('./models/index')
const cors = require("cors")
const path = require('path')
const router = require('./routes/index')
const errorHandler = require('./middlewares/ErrorHandlingMiddleware')
const seedRoles = require('./seeders/seedRoles')
const seedCasesStatuse = require('./seeders/seedCasesStatutes')
const seedApplicationStatuses = require('./seeders/seedApplicationStatuses')
const seedCasesDifficulty = require('./seeders/seedCasesDifficulty')
const seedCases = require('./seeders/seedCases')
const seedTags = require('./seeders/seedTags')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/static/users', express.static(path.resolve(__dirname, 'static/users')))
app.use('/api/v1', router)
app.use(errorHandler)

const start = async () => {
    try {
        await postgre.authenticate()
        await postgre.sync()
        await seedRoles()
        await seedCasesStatuse()
        await seedApplicationStatuses()
        await seedCasesDifficulty()
        await seedCases()
        await seedTags()
        app.listen(PORT, () => console.log(`\n✅ Server started: http://localhost:${PORT}`))
    } catch (e) {
        console.error(e);
    }
}

start()