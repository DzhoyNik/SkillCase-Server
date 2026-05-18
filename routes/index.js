const Router = require('express')
const router = new Router()
const authRouter = require("./authRouter")
const caseRouter = require("./caseRouter")
const userRouter = require("./userRouter")
const companyRouter = require("./companyRouter")
const tagRouter = require("./tagRouter")

router.use('/auth', authRouter)
router.use('/user', userRouter)
router.use('/case', caseRouter)
router.use('/company', companyRouter)
router.use('/tag', tagRouter)

module.exports = router