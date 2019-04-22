const express = require("express")
const router = express.Router()
const User = require("../models/User")

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Player's Hut" })
})

/* POST for updating data. */
router.post("/", function(req, res, next) {
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
  }
})

module.exports = router
