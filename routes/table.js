const express = require("express")
const router = express.Router()

/* GET table page. */
router.get("/", function(req, res, next) {
  res.render("table", { table_id: `${req.query.table_id}` })
})

module.exports = router
