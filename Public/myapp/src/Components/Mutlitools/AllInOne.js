import React, { Component } from "react";
// import "./image.css";
import "./spinner.css";
import "./AllInOne.css";
import Content from "./Content/Content";
class AllInOne extends Component {
  constructor() {
    super();
    this.state = {
      prompt: "",
      summaryLength: 200, // Initialize the size state with "medium"
      data: "",
      showSpinner: false,
    };
  }
  handleShowSpinner = () => {
    this.setState({ showSpinner: true });
  };
  onInputChange = (e) => {
    this.setState({ prompt: e.target.value });
  };

  handleInputChange = (e) => {
    this.setState({ summaryLength: e.target.value });
  };

  onClickSubmit = (e) => {
    console.log("clicked");
    e.preventDefault();
    if (this.state.prompt === "") {
      alert("Please add some text");
      return;
    }
    this.setState({ showSpinner: true });

    fetch("https://wax-available-duke.glitch.me/openai/LingoRevamp", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        inputData: this.state.prompt,
        // summaryLength: this.state.summaryLength,
        // temperature: this.state.temperature,
        frequencyPenalty: this.state.frequencyPenalty,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ data: data }, () => {
          console.log(this.state.data);
          this.setState({ showSpinner: false });
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
        this.setState({ showSpinner: false });
      });
  };

  render() {
    const { showSpinner, data } = this.state;
    return (
      <div class="Hero-container">
        <h1 className="hero-heading head">LingoRevamp</h1>
        <br></br>
        <p className="textt">
          Welcome to LingoRevamp! This powerful tool allows you to enhance and
          transform your text. To get started, simply enter your text in the
          input field and specify the desired summary length (default is 200).
          Click the "Submit" button to generate amazing results. Stay tuned for
          the magic to happen!
        </p>
        <form>
          <label for="input1">Input</label>

          <input
            type="text"
            id="input1"
            placeholder="Enter your Text"
            onChange={this.onInputChange}
          />

          <label for="input2">Summary Length</label>

          <input
            className="userInput"
            type="text"
            id="input2"
            placeholder="Enter lenght default will be 200"
            onChangeCapture={this.handleInputChange}
          />
          <br></br>

          <button className="button" type="submit" onClick={this.onClickSubmit}>
            Submit
          </button>
        </form>
        {showSpinner ? (
          <p style={{ color: "black", fontSize: "20px" }}>Loading</p>
        ) : null}
        {data && <Content data={data} />}
        {this.state.showSpinner && <div className="spinner"></div>}
        {/* <div id="result">
          <img id="resultImg" src="path/to/your/image.jpg" alt="Result Image" />
          <div id="resultText">
            <p>Input 1: Static Data 1</p>
            <p>Input 2: Static Data 2</p>
          </div>
        </div> */}
      </div>
    );
  }
}

export default AllInOne;
