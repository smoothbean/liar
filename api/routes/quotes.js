var express = require("express");
var router = express.Router();

/* GET quotes. */
router.get("/", function(req, res, next) {
  res.send([
    [
      {
        id: 1,
        quote:
          "Wildfires across the united states typically burn 4 million to 8 million acres.",
        isTrue: 1
      },
      {
        id: 2,
        quote:
          "Forest fires are an enormous problem, causing loss of resources and the extinction of wildlife.",
        isTrue: 1
      },
      {
        id: 3,
        quote:
          "Forest fires are caused by the mess on the forest floors and can be prevented by cleaning them.",
        isTrue: 0
      }
    ],
    [
      {
        id: 4,
        quote:
          "In 2017, 10 million acres across the united states were lost to forest fires.",
        isTrue: 1
      },
      {
        id: 5,
        quote:
          "Increases in average annual temperatures, caused by global warming, elevate the risk of forest fires.",
        isTrue: 1
      },
      {
        id: 6,
        quote: "Finland prevents forest fires by raking the forest floors.",
        isTrue: 0
      }
    ],
    [
      {
        id: 7,
        quote:
          "6,000 scientific studies, by 91 scientists in 40 different counties, conclude that climate change is an imminent threat.",
        isTrue: 1
      },
      {
        id: 8,
        quote: "Climate change could be irreversible by 2030.",
        isTrue: 1
      },
      { id: 9, quote: "‘Global warming- a total hoax!’", isTrue: 0 }
    ],
    [
      {
        id: 10,
        quote:
          "Boris Johnson talked about the issue of Turkey joining the EU several times in the lead-up to 23 June 2016.",
        isTrue: 1
      },
      {
        id: 11,
        quote:
          "Boris Johnson wrote to the prime minister warning about Turkish membership a week before the vote.",
        isTrue: 1
      },
      {
        id: 12,
        quote: "Boris Johnson ‘didn’t say anything about turkey’.",
        isTrue: 0
      }
    ],
    [
      {
        id: 13,
        quote: "The UK gives £161 million a week to the EU.",
        isTrue: 1
      },
      {
        id: 14,
        quote: "£115 million a week from the EU is spent within Britain.",
        isTrue: 1
      },
      {
        id: 15,
        quote: "The UK loses £350 million per week to EU membership.",
        isTrue: 0
      }
    ],
    [
      {
        id: 16,
        quote: "Paris only has one stop sign.",
        isTrue: 1
      },
      {
        id: 17,
        quote: "Paris is Paris.",
        isTrue: 1
      },
      { id: 18, quote: "Paris is no longer Paris.", isTrue: 0 }
    ],
    [
      {
        id: 19,
        quote: "Germany only receives 20% of its energy from Russian gas.",
        isTrue: 1
      },
      {
        id: 20,
        quote:
          "Germany's energy mix for power production is about 40% coal, more than 30% renewables, less than 20% gas and 10% nuclear.",
        isTrue: 1
      },
      {
        id: 21,
        quote:
          "Germany is totally controlled by Russia because they will be getting 60% to 70% from Russia and a new pipe line.",
        isTrue: 0
      }
    ],
    [
      {
        id: 22,
        quote: "China militarises their south seas.",
        isTrue: 1
      },
      {
        id: 23,
        quote: "China uses robotic doves to monitor civilians.",
        isTrue: 1
      },
      {
        id: 24,
        quote: "Xi Jinping will not be militarising the south china seas.",
        isTrue: 0
      }
    ],
    [
      {
        id: 25,
        quote:
          "Climate change is causing a refugee crisis, people are fleeing their homes as a result of extreme weather.",
        isTrue: 1
      },
      {
        id: 26,
        quote: "The 20 warmest years on record have been in the last 22 years.",
        isTrue: 1
      },
      { id: 27, quote: "Climate change could reverse itself.", isTrue: 0 }
    ],
    [
      {
        id: 28,
        quote: "Kim Jong-un has access to a personal toilet at all times.",
        isTrue: 1
      },
      {
        id: 29,
        quote:
          "In North Korea, the average worker takes home less than $2,000 a year.",
        isTrue: 1
      },
      {
        id: 30,
        quote: "Kim Jong-un could drive by the age of three.",
        isTrue: 0
      }
    ]
  ]);
});

module.exports = router;
