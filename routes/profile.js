const express = require("express")
const router = express.Router()
const User = require("../models/User")

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

module.exports = router
