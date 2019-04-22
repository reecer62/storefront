const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const path = require("path")

// Routers
const indexRouter = require("./routes/index")

const app = express()

// View engine
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

// Middleware
app.use(bodyParser.json()) // Extract data from request body
app.use(bodyParser.urlencoded({ extended: false })) // Extract data from url

// Set public folder
app.use(express.static(path.join(__dirname, "public")))

// Set routes
app.use("/", indexRouter)

const port = 3000

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`))
