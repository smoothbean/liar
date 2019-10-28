var express = require("express");
var router = express.Router();

/* GET quotes. */
router.get("/", function(req, res, next) {
  res.send("respond with quotes");
});

module.exports = router;
