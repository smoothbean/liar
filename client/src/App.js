import React, { Component } from "react";
import "./App.css";

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
            .then(res =>
              this.setState({
                results: JSON.parse(res),
                quotes,
                page: 0,
                chosen: {},
                speechImgs: {}
              })
            );
        }

        this.setState({
          quotes,
          page: 0,
          chosen: {},
          speechImgs: {},
          results: {}
        });
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
    console.log(this.state.results);
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
