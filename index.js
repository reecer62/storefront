const express = require("express")
const app = express()

app.get("/", (req, res) => {
  res.send("Hello World!")
})

const port = 3000

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`))
