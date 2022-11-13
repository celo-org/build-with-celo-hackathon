const { Router } = require("express")
const cashoutCreated = require("../controllers/cashoutController")

const router = Router()

router.post("/cashout", cashoutCreated)

module.exports = router
