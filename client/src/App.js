import React, { Component } from "react";
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 0, quotes: false };

    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
  }

  callAPI() {
    fetch("http://localhost:9000/quotes")
      .then(res => res.text())
      .then(res => this.setState({ quotes: JSON.parse(res) }));
  }

  componentWillMount() {
    this.callAPI();
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

  renderNext() {
    if (this.state.quotes[this.state.page + 1])
      return (
        <p className="pagination" onClick={this.handleNext}>
          Next ->
        </p>
      );
  }

  renderPrev() {
    if (this.state.page > 0)
      return (
        <p className="pagination prev" onClick={this.handlePrev}>
          {"<- Prev"}
        </p>
      );
  }

  renderQuotes() {
    let quotes = this.state.quotes ? this.state.quotes[this.state.page] : [];
    return (
      <div className="quotes">
        <div className="quote_wrapper">
          <img src="/speech.svg" className="quote reverse" alt="quote" />
          <p className="quote_text quote_text--reverse">
            {quotes[0] ? quotes[0].quote : ""}
          </p>
        </div>
        <div className="quote_wrapper">
          <img src="/speech.svg" className="quote " alt="quote" />
          <p className="quote_text">{quotes[1] ? quotes[1].quote : ""}</p>
        </div>
        <div className="quote_wrapper">
          <img src="/speech.svg" className="quote reverse" alt="quote" />
          <p className="quote_text quote_text--reverse">
            {quotes[2] ? quotes[2].quote : ""}
          </p>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="grid">
          <div className="one">{this.renderPrev()}</div>
          {this.renderQuotes()}
          <div className="two">{this.renderNext()}</div>
        </div>
      </div>
    );
  }
}
