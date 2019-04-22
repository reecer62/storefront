const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app = express()

// Body parser middleware
app.use(bodyParser.json()) // Extract data from request body
app.use(bodyParser.urlencoded({ extended: false })) // Extract data from url

app.get("/", (req, res) => {
  res.send("Hello World!")
})

const port = 3000

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`))
