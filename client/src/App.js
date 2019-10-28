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
        <div class="row">
          <div
            class="
                col-md-3 one">
            1
          </div>
          <div
            class="
                col-md-6 two">
            <div class="quotes">
              <div class="quote_wrapper">
                <img src="/speech.png" class="speech" />
              </div>
              <div class="quote_wrapper">
                <img src="/speech.png" class="speech reverse" />
              </div>
              <div class="quote_wrapper">
                <img src="/speech.png" class="speech" />
              </div>
            </div>
          </div>
          <div
            class="
                col-md-3 one">
            3
          </div>
        </div>
      </div>
    );
  }
}
