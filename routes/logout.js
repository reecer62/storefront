const express = require("express")
const router = express.Router()

/* GET logout. */
router.get("/", function(req, res, next) {
  if (req.session) {
    // Delete session
    req.session.destroy(function(err) {
      if (err) {
        return next(err)
      } else {
        return res.redirect("/")
      }
    })
  }
})

module.exports = router
