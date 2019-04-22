const express = require("express")
const router = express.Router()
const User = require("../models/User")

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Player's Hut" })
})

/* POST for updating data. */
router.post("/", function(req, res, next) {
  if (req.body.password != req.body.confirm_password) {
    var err = new Error("Passwords do not match.")
    err.status = 400
    res.send("passwords dont match")
    return next(err)
  }

  if (req.body.email && req.body.password) {
    var userData = {
      email: req.body.email,
      password: req.body.password
    }

    User.create(userData, function(error, user) {
      if (error) {
        return next(error)
      } else {
        req.session.userId = user._id
        return res.redirect("/profile")
      }
    })
  } else if (req.body.login_email && req.body.login_password) {
    User.authenticate(req.body.login_email, req.body.login_password, function(
      error,
      user
    ) {
      if (error || !user) {
        var err = new Error("Wrong email or password.")
        err.status = 401
        return next(err)
      } else {
        req.session.userId = user._id
        return res.redirect("/profile")
      }
    })
  } else {
    var err = new Error("All fields required.")
    err.status = 400
    return next(err)
  }
})

module.exports = router
