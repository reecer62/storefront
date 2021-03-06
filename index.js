const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const helmet = require("helmet")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

// Load environment variables
const result = dotenv.config()
if (result.error) {
  throw result.error
}
console.log(result.parsed)

const port = process.env.PORT || 3000

// Connect to db
mongoose
  .connect(process.env.PROD_MONGODB, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log(err))

// Routers
const indexRouter = require("./routes/index")
const profileRouter = require("./routes/profile")
const logoutRouter = require("./routes/logout")
const tableRouter = require("./routes/table")

const app = express()

// View engine
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

// Session tracks logins
app.use(
  session({
    secret: process.env.SECRET,
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
app.use(helmet()) // Prevent well known http header vulnerabilities

// Set public folder
app.use(express.static(path.join(__dirname, "public")))

// Set routes
app.use("/", indexRouter)
app.use("/profile", profileRouter)
app.use("/logout", logoutRouter)
app.use("/table", tableRouter)

// Start server
const http = require("http").Server(app)
const io = require("socket.io")(http)
http.listen(port, () => console.log(`Server started on port ${port}`))

// Socket connection
io.on("connection", client => {
  // Client has connected
  io.emit("message", client.id + " joined")

  // Relay message
  client.on("message", msg => {
    io.emit("message", msg)
  })

  // Client typing
  client.on("typing", () => {
    io.emit("typing", client.id)
  })

  // Client stop typing
  client.on("stop typing", () => {
    io.emit("stop typing", client.id)
  })

  // Client disconnects
  client.on("disconnect", () => {
    console.log("client disconnect...", client.id)
    io.emit("message", client.id + " left")
  })

  // Error handling
  client.on("error", err => {
    console.log("received error from client: ", client.id)
    console.log(err)
  })
})
