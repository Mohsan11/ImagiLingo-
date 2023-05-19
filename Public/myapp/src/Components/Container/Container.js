import React from "react";
import "./container.css";

const Container = ({ onClickSubmit, onInputChange, onInputChange2 }) => {
  return (
    <div>
      <div className="heading">
        <i className="fa-thin fa-microchip-ai"></i> <h1>AI Text Program</h1>
        <br />
        <p className="intro">
          The AI text generator has the ability to process input text and carry
          out operations based on the provided command. Simply input the word or
          sentence and specify the command in the command box.
        </p>
      </div>
      <section className="container2">
        <form className="form" onSubmit={onClickSubmit}>
          <div>
            <input
              className="input"
              type="text"
              placeholder="Enter text"
              onChange={onInputChange}
            />
          </div>
          <div>
            <input
              onChange={onInputChange2}
              className="input"
              type="text"
              placeholder="Enter instructions"
            />
          </div>
          <input className="submit" type="submit" value="Submit" />
        </form>
      </section>
    </div>
  );
};

export default Container;
