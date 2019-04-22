const express = require("express")
const router = express.Router()
const User = require("../models/User")
const Table = require("../models/Table")

/* GET after registered. */
router.get("/", function(req, res, next) {
  User.findById(req.session.userId).exec(function(error, user) {
    if (error) {
      return next(error)
    } else {
      if (user === null) {
        var err = new Error("Not authorized! Go back!")
        err.status = 400
        return next(err)
      } else {
        res.render("profile", { email: `${user.email}` })
      }
    }
  })
})

/* POST for table. */
router.post("/", function(req, res, next) {
  if (req.body.create_id && req.body.create_password) {
    var tableData = {
      table_id: req.body.create_id,
      table_password: req.body.create_password
    }

    Table.create(tableData, function(error, table) {
      if (error) {
        return next(error)
      } else {
        return res.redirect(
          `http://localhost:3000/table/?table_id=${req.body.create_id}`
        )
      }
    })
  } else if (req.body.table_id && req.body.table_password) {
    Table.authenticate(req.body.table_id, req.body.table_password, function(
      error,
      table
    ) {
      if (error || !table) {
        var err = new Error("Wrong table id or password.")
        err.status = 401
        return next(err)
      } else {
        return res.redirect(
          `http://localhost:3000/table/?table_id=${req.body.create_id}`
        )
      }
    })
  } else {
    var err = new Error("All fields required.")
    err.status = 400
    return next(err)
  }
})

module.exports = router
