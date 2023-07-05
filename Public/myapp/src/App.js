import { Component } from "react";
import "./App.css";
import Nav from "./Components/Nav";
import Container from "./Components/Container/Container";
import Home from "./Components/Home/Home";
import Response from "./Components/Response/Response";
import Image from "./Components/Image/Image";
import Contact from "./Components/Contact/Contact";
import AllInOne from "./Components/Mutlitools/AllInOne";
class App extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
      cmd: "",
      data: [],
      page: "home",
    };
  }

  onInputChange = (e) => {
    this.setState({ text: e.target.value });
  };

  onInputChange2 = (e) => {
    this.setState({ cmd: e.target.value });
  };

  handleButton1Click = () => {
    this.setState({ page: "art" });
  };

  handleButton2Click = () => {
    this.setState({ page: "text" });
  };
  handleButton3Click = () => {
    this.setState({ page: "multi" });
  };

  homeChanger = () => {
    this.setState({ page: "home" });
  };
  contactChanger = () => {
    this.setState({ page: "contact" });
  };
  onClickSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");

    fetch("http://localhost:5000/openai/textgeneration", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        text: this.state.text,
        cmd: this.state.cmd,
      }),
    })
      .then((response) => response.json())
      .then((data) => this.setState({ data: data.choices }))
      .catch((err) => console.log("Error: ", err));
  };

  render() {
    return (
      <div className="main">
        <Nav
          homeChanger={this.homeChanger}
          contactChanger={this.contactChanger}
        />
        {this.state.page === "text" ? (
          <div>
            <Container
              onInputChange={this.onInputChange}
              onInputChange2={this.onInputChange2}
              onClickSubmit={this.onClickSubmit}
            />
            <Response data={this.state.data} />
          </div>
        ) : this.state.page === "art" ? (
          <Image />
        ) : this.state.page === "contact" ? (
          <Contact />
        ) : this.state.page === "multi" ? (
          <AllInOne />
        ) : (
          this.state.page === "home" && (
            <Home
              handleButton1Click={this.handleButton1Click}
              handleButton2Click={this.handleButton2Click}
              handleButton3Click={this.handleButton3Click}
            />
          )
        )}
      </div>
    );
  }
}

export default App;
