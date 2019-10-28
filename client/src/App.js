import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "flexboxgrid";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/quotes")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="App">
        <div className="grid">
          <div className="one">1</div>
          <div className="quotes">
            <div className="quote_wrapper">
              <img src="/speech.png" className="quote" />
            </div>
            <div className="quote_wrapper">
              <img src="/speech.png" className="quote reverse" />
            </div>
            <div className="quote_wrapper">
              <img src="/speech.png" className="quote" />
            </div>
          </div>
          <div className="two">3</div>
        </div>
      </div>
    );
  }
}
