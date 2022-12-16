const { Router } = require("express")
const {
  cashoutCreated,
  getTransactions,
} = require("../controllers/cashoutController")

const router = Router()

router.post("/cashout", cashoutCreated)
router.get("/cashout", getTransactions)
router.get("/", (req, res) => {
  res.send("seen you too")
})

module.exports = router
