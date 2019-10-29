var express = require("express");
var router = express.Router();

/* GET quotes. */
router.get("/", function(req, res, next) {
  res.send([
    [
      { id: 1, quote: "cheese is good for your mental health", isTrue: 1 },
      {
        id: 2,
        quote: "headaches cause intermittent elbow twitches",
        isTrue: 1
      },
      { id: 3, quote: "humans were created as carnivores", isTrue: 0 }
    ],
    [
      { id: 1, quote: "222cheese is good for your mental health", isTrue: 1 },
      {
        id: 2,
        quote: "222headaches cause intermittent elbow twitches",
        isTrue: 1
      },
      { id: 3, quote: "222humans were created as carnivores", isTrue: 0 }
    ],
    [
      { id: 1, quote: "333cheese is good for your mental health", isTrue: 1 },
      {
        id: 2,
        quote: "333headaches cause intermittent elbow twitches",
        isTrue: 1
      },
      { id: 3, quote: "333humans were created as carnivores", isTrue: 0 }
    ]
  ]);
});

module.exports = router;
