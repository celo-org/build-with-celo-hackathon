const path = require("path")
const express = require("express")
const morgan = require("morgan")
const connectDB = require("./config/db.js")
const { errorHandler, notFound } = require("./middlewareHandlers/errorHandler")
require("colors")
require("dotenv").config({ path: __dirname + "/.env" })
connectDB()
const app = express()
app.use("/posts", (req, res) => {
  console.log("this is a middleware running")
})
app.get("/", (req, res) => {
  res.send("this is the home page")
})
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"))
}
app.use(errorHandler)
app.use(notFound)
const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `app is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      .yellow.bold
  )
)
