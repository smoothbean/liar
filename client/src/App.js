import React, { Component } from "react";
import "./App.css";
import { Bar } from "react-chartjs-2";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 0, quotes: false, chosen: {}, speechImgs: {} };

    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleQuoteClick = this.handleQuoteClick.bind(this);
    this.handleFinish = this.handleFinish.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }

  callAPI() {
    fetch("http://api.codeloom.co.uk/quotes")
      // fetch("http://127.0.0.1:9000/quotes")
      .then(res => res.text())
      .then(res => {
        const quotes = JSON.parse(res).map(quotes => {
          quotes = quotes.sort(() => Math.random() - 0.5);
          return quotes;
        });

        if (window.location.pathname == "/results") {
          fetch("http://api.codeloom.co.uk/results")
            // fetch("http://127.0.0.1:9000/results")
            .then(res => res.text())
            .then(res => {
              this.setState({
                results: JSON.parse(res),
                quotes,
                page: 0,
                chosen: {},
                speechImgs: {}
              });
            });
        } else {
          this.setState({
            quotes,
            page: 0,
            chosen: {},
            speechImgs: {},
            results: {}
          });
        }
      });
  }

  componentWillMount() {
    this.callAPI();

    fetch(
      "http://api.ipapi.com/92.237.197.224?access_key=5aa21bac1114e79b9c2133bdad1d65c0"
    )
      .then(res => res.json())
      .then(json => this.setState({ ip: json.ip }));
  }

  handleNext() {
    this.setState({
      page: this.state.page + 1
    });
  }

  handlePrev() {
    this.setState({
      page: this.state.page - 1
    });
  }

  handleFinish() {
    let score = 0;

    Object.keys(this.state.chosen).forEach(page => {
      let id = this.state.chosen[page];

      let quote = this.state.quotes[page].find(q => {
        return q.id == id;
      });

      if (quote.isTrue == 0) {
        score++;
      }
    });

    fetch("http://api.codeloom.co.uk/quotes", {
      // fetch("http://127.0.0.1:9000/quotes", {
      method: "post",
      body: JSON.stringify({ ip: this.state.ip, chosen: this.state.chosen }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.text())
      .then(res =>
        this.setState({
          page: "fin",
          score: `${score}/10`
        })
      );
  }

  handleRestart() {
    this.callAPI();
  }

  handleQuoteClick(e) {
    const id = e.target.dataset.id;

    let quote = this.state.quotes[this.state.page].find(quotes => {
      return quotes.id == id;
    }).quote;

    let chosen = Object.assign(this.state.chosen, {});
    chosen[this.state.page] = id;

    this.setState({ chosen });
  }

  handleSpeechHover(isHovered, id) {
    let speechImgs = Object.assign(this.state.speechImgs, {});
    speechImgs[id] = isHovered ? "speech-grey.svg" : "speech.svg";
    this.setState({ speechImgs });
  }

  renderNext() {
    if (
      this.state.quotes[this.state.page + 1] &&
      this.state.chosen[this.state.page]
    )
      return (
        <p className="pagination pagination--next" onClick={this.handleNext}>
          <span>Next -></span>
        </p>
      );

    if (this.state.page == 9 && this.state.chosen[this.state.page])
      return (
        <p
          className="pagination pagination--finish"
          onClick={this.handleFinish}>
          Finish
        </p>
      );
  }

  renderPrev() {
    if (this.state.page > 0)
      return (
        <p className="pagination pagination--prev" onClick={this.handlePrev}>
          <span>{`<- Prev`}</span>
        </p>
      );
  }

  renderAnswer(img) {
    if (img == "speech-green.svg") return <p className="answer">Truth</p>;
    if (img == "speech-red.svg") return <p className="answer">Lie</p>;
  }

  renderQuotes() {
    if (this.state.page == "fin")
      return (
        <div className="score_wrapper">
          <p className="score bred">{this.state.score} </p>
          <p className="restart" onClick={this.handleRestart}>
            {"Restart"}
          </p>
        </div>
      );

    let quotes = this.state.quotes ? this.state.quotes[this.state.page] : [];

    let classN;
    let classes = quotes.map(q => {
      classN = "quote_text";
      if (q.quote.length <= 60) {
        classN = `${classN} quote_text--centered`;
      }
      return classN;
    });

    let speechImg = quotes.map(q => {
      if (this.state.chosen[this.state.page]) {
        if (q.isTrue) return "speech-green.svg";
        return "speech-red.svg";
      }
      if (this.state.speechImgs[q.id]) return this.state.speechImgs[q.id];
      return "speech.svg";
    });

    return (
      <div className="quotes">
        <div className="title">Find the lie.</div>
        <div className="quote_wrapper">
          <img
            src={speechImg[0]}
            className="quote reverse"
            alt="quote"
            data-id={quotes[0] ? quotes[0].id : ""}
            onClick={this.handleQuoteClick}
            onMouseEnter={() => {
              this.handleSpeechHover(true, quotes[0] ? quotes[0].id : "");
            }}
            onMouseLeave={() => {
              this.handleSpeechHover(false, quotes[0] ? quotes[0].id : "");
            }}
            height={280}
          />
          <p
            className={`${classes[0]}  quote_text--reverse`}
            data-id={quotes[0] ? quotes[0].id : ""}
            onClick={this.handleQuoteClick}
            onMouseEnter={() => {
              this.handleSpeechHover(true, quotes[0] ? quotes[0].id : "");
            }}
            onMouseLeave={() => {
              this.handleSpeechHover(false, quotes[0] ? quotes[0].id : "");
            }}>
            {quotes[0] ? quotes[0].quote : ""}
          </p>
          {this.renderAnswer(speechImg[0], true)}
        </div>
        <div className="quote_wrapper">
          <img
            src={speechImg[1]}
            className="quote"
            alt="quote"
            data-id={quotes[1] ? quotes[1].id : ""}
            onMouseEnter={() => {
              this.handleSpeechHover(true, quotes[1] ? quotes[1].id : "");
            }}
            onMouseLeave={() => {
              this.handleSpeechHover(false, quotes[1] ? quotes[1].id : "");
            }}
            onClick={this.handleQuoteClick}
            height={280}
          />
          <p
            className={`${classes[1]}`}
            data-id={quotes[1] ? quotes[1].id : ""}
            onClick={this.handleQuoteClick}
            onMouseEnter={() => {
              this.handleSpeechHover(true, quotes[1] ? quotes[1].id : "");
            }}
            onMouseLeave={() => {
              this.handleSpeechHover(false, quotes[1] ? quotes[1].id : "");
            }}>
            {quotes[1] ? quotes[1].quote : ""}
          </p>
          {this.renderAnswer(speechImg[1])}
        </div>
        <div className="quote_wrapper">
          <img
            src={speechImg[2]}
            className="quote reverse"
            alt="quote"
            data-id={quotes[2] ? quotes[2].id : ""}
            onMouseEnter={() => {
              this.handleSpeechHover(true, quotes[2] ? quotes[2].id : "");
            }}
            onMouseLeave={() => {
              this.handleSpeechHover(false, quotes[2] ? quotes[2].id : "");
            }}
            onClick={this.handleQuoteClick}
            height={280}
          />
          <p
            className={`${classes[2]}  quote_text--reverse`}
            data-id={quotes[2] ? quotes[2].id : ""}
            onClick={this.handleQuoteClick}
            onMouseEnter={() => {
              this.handleSpeechHover(true, quotes[2] ? quotes[2].id : "");
            }}
            onMouseLeave={() => {
              this.handleSpeechHover(false, quotes[2] ? quotes[2].id : "");
            }}>
            {quotes[2] ? quotes[2].quote : ""}
          </p>
          {this.renderAnswer(speechImg[2], true)}
        </div>
      </div>
    );
  }

  renderLink() {
    if (window.location.pathname == "/results")
      return (
        <a href="/" className="result_link">
          Game
        </a>
      );
    return (
      <a href="/results" className="result_link">
        Results
      </a>
    );
  }

  render() {
    if (window.location.pathname == "/results") {
      if (!this.state.results) return <p>loading...</p>;

      let results = {};
      let quotes = {};
      Object.keys(this.state.quotes).forEach(qId => {
        quotes[qId] = {};
        this.state.quotes[qId].map(a => {
          quotes[qId][a.id] = a;
        });
        if (!results[qId]) results[qId] = 0;
      });

      let trueList = {};
      let scores = {};
      Object.keys(this.state.results).forEach(resId => {
        const res = this.state.results[resId];
        const qId = res.question_id;
        const quote = quotes[qId][res.answer_id];

        if (!scores[res.group_id]) scores[res.group_id] = 0;

        if (quote.isTrue) {
          results[qId]++;
          scores[res.group_id]++;
          trueList[qId] = quote.quote;
        }
      });

      let scoresArr = [];
      let scoreMin = false;
      let scoreMax = false;
      for (let i = 1; i <= 10; i++) {
        let count = 0;
        Object.keys(scores).forEach(s => {
          if (scores[s] == i) count = count + 1;
        });
        if (!scoreMin || count < scoreMin) scoreMin = count;
        if (!scoreMax || count > scoreMax) scoreMax = count;
        scoresArr.push(count);
      }
      console.log(scores, scoresArr);

      let min = false;
      let max = false;
      Object.keys(results).forEach(r => {
        if (!min || results[r] < min) min = results[r];
        if (!max || results[r] > max) max = results[r];
      });

      const data = {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        datasets: [
          {
            label: "Correct answers",
            backgroundColor: "rgba(20,120,240)",
            borderColor: "rgba(20,79,240)",
            borderWidth: 1,
            barPercentage: 0.5,
            hoverBackgroundColor: "rgba(20,170,240)",
            order: 0,
            data: Object.keys(results).map(r => results[r]),
            options: {}
          }
        ]
      };

      const scoreData = {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
        datasets: [
          {
            label: "Scores",
            backgroundColor: "rgba(200,120,240)",
            borderColor: "rgba(200,79,240)",
            borderWidth: 1,
            barPercentage: 0.5,
            hoverBackgroundColor: "rgba(200,170,240)",
            order: 0,
            data: scoresArr,
            options: {}
          }
        ]
      };

      return (
        <div className="App">
          <div className="grid results">
            <div className="one">{this.renderLink()}</div>
            <div className="col">
              <div className="bar_wrapper">
                <Bar
                  data={data}
                  width={800}
                  height={800}
                  options={{
                    tooltips: {
                      callbacks: {
                        label: tooltipItem => {
                          return `${tooltipItem.value} people got question ${
                            tooltipItem.label
                          } correct. Quote - "${trueList[tooltipItem.index]}"`;
                        }
                      }
                    },
                    maintainAspectRatio: false,
                    scales: {
                      xAxes: [
                        {
                          stacked: true,
                          scaleLabel: {
                            display: true,
                            labelString: "Question No."
                          }
                        }
                      ],
                      yAxes: [
                        {
                          stacked: true,
                          ticks: {
                            min: Math.floor(min - min / 10),
                            max: Math.ceil(max + max / 10)
                          }
                        }
                      ]
                    }
                  }}
                />
              </div>
              <div className="bar_wrapper">
                <Bar
                  data={scoreData}
                  width={800}
                  height={800}
                  options={{
                    tooltips: {
                      callbacks: {
                        label: tooltipItem => {
                          return `${tooltipItem.value} ${
                            tooltipItem.value == 1 ? "person" : "people"
                          } scored ${tooltipItem.label} points.`;
                        }
                      }
                    },
                    maintainAspectRatio: false,
                    scales: {
                      xAxes: [
                        {
                          stacked: true,
                          scaleLabel: {
                            display: true,
                            labelString: "Score"
                          }
                        }
                      ],
                      yAxes: [
                        {
                          stacked: true,
                          ticks: {
                            min: Math.floor(scoreMin - scoreMin / 10),
                            max: Math.ceil(scoreMax + scoreMax / 10)
                          }
                        }
                      ]
                    }
                  }}
                />
              </div>
            </div>
            <div className="two"></div>
          </div>
        </div>
      );
    }

    return (
      <div className="App">
        <div className="grid">
          <div className="one">{this.renderLink()}</div>
          {this.renderQuotes()}
          <div className="two">{this.renderNext()} </div>
        </div>
      </div>
    );
  }
}
