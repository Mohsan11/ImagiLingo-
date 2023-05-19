import React, { Component } from "react";
import "./image.css";
import "./spinner.css";
class App extends Component {
  constructor() {
    super();
    this.state = {
      prompt: "",
      size: "medium", // Initialize the size state with "medium"
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
    this.setState({ size: e.target.value });
  };

  onClickSubmit = (e) => {
    console.log("clicked");
    e.preventDefault();
    if (this.state.prompt === "") {
      alert("Please add some text");
      return;
    }
    this.setState({ showSpinner: true });

    if (this.state.data === "") {
      console.log("waiting");
    }
    fetch("http://localhost:5000/openai/generateimage", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        prompt: this.state.prompt,
        size: this.state.size,
      }),
    })
      .then((response) => response.json())
      .then((data) => this.setState({ data: data.data }))
      .then((data) => console.log(data))
      .then(() => {
        this.setState({ showSpinner: false });
      })
      .catch((err) => console.log("Error: ", err));
  };

  render() {
    return (
      <div>
        <header className="body">
          <div className="navbar">
            <div className="logo"></div>
            <div className="nav-links">
              <ul>
                <li>
                  <a
                    href="https://beta.openai.com/docs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fa fa-file" aria-hidden="true"></i> OpenAI
                    Tutorials
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </header>

        <main>
          <section className="showcase">
            <form id="image-form">
              <h1>Generate Images from your Words</h1>

              <div className="form-control">
                <input
                  type="text"
                  id="prompt"
                  onChange={this.onInputChange}
                  placeholder="Describe your Image"
                />
              </div>
              <div className="form-control">
                <select
                  name="size"
                  id="size"
                  value={this.state.size}
                  onChange={this.handleInputChange}
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn"
                onClick={this.onClickSubmit}
              >
                Generate
              </button>
            </form>
          </section>

          <section className="image">
            <div className="image-container">
              <h2 className="msg"> </h2>
              <img src={this.state.data} alt={this.state.data} id="image" />
            </div>
          </section>
        </main>

        {this.state.showSpinner && <div className="spinner"></div>}
      </div>
    );
  }
}

export default App;
