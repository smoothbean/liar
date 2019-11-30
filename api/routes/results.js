var express = require("express");
var router = express.Router();

/* GET quotes. */
router.get("/", function(req, res, next) {
  var mysql = require("mysql");

  var con = mysql.createConnection({
    // host: "localhost",
    // user: "sufia_codeloom_co_uk",
    // password: "sufia_codeloom_co_uksdatabaseisapassword"
    host: "localhost",
    user: "jack",
    password: "pineappleonpizza"
  });
  console.log("testtt");
  con.connect(function(err) {
    if (err) throw err;
    con.query(
      "select ANY_VALUE(id) as id, question_id, answer_id, group_id from liar.chosen;",
      function(err, result) {
        console.log("here", result);
        res.send(result);
      }
    );
  });
});

module.exports = router;
