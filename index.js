const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
var session = require("express-session")
var MongoStore = require("connect-mongo")(session)

// Connect to db
const mongoose = require("./config/db")

// Routers
const indexRouter = require("./routes/index")
const profileRouter = require("./routes/profile")
const logoutRouter = require("./routes/logout")

const app = express()

// View engine
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

// Session tracks logins
app.use(
  session({
    secret: "Definitely a secret.",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  })
)

// Middleware
app.use(bodyParser.json()) // Extract data from request body
app.use(bodyParser.urlencoded({ extended: false })) // Extract data from url

// Set public folder
app.use(express.static(path.join(__dirname, "public")))

// Set routes
app.use("/", indexRouter)
app.use("/profile", profileRouter)
app.use("/logout", logoutRouter)

const port = 3000

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`))
