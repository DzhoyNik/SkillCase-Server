require('dotenv').config()
const express = require('express')
const postgre = require('./database/postgre')
const models = require('./models/index')
const cors = require("cors")

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())

const start = async () => {
    try {
        await postgre.authenticate()
        await postgre.sync()
        app.listen(PORT, () => console.log(`\n✅ Server started: http://localhost:${PORT}`))
    } catch (e) {
        console.error(e);
    }
}

start()