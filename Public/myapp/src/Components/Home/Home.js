import React from "react";
import "./Home.css";
const Home = ({
  handleButton1Click,
  handleButton2Click,
  handleButton3Click,
}) => {
  return (
    <div className="homeContainer">
      <div className="Card">
        <div>
          <i onClick={handleButton1Click} className="fa fa-image fa-3x"></i>
        </div>
        <h1 className="head" onClick={handleButton1Click}>
          Image
        </h1>
        <p onClick={handleButton1Click}>
          Unleash your creativity with AI-powered image generation. Transform
          your ideas into stunning visuals with a click. Explore endless
          possibilities and bring your imagination to life. Click now to embark
          on a visual journey of innovation and inspiration.
        </p>
      </div>
      <div className="Card">
        <div>
          <i
            onClick={handleButton2Click}
            className="fa fa-text-height fa-3x"
          ></i>
        </div>
        <h1 className="head" onClick={handleButton2Click}>
          Word Wizard
        </h1>
        <p onClick={handleButton2Click}>
          Experience the power of AI-driven text generation. Simply input your
          text and command, and watch as our intelligent system brings your
          words to life. From creative storytelling to generating code snippets,
          explore a world of possibilities with just a few clicks. Unleash the
          potential of text-based AI and discover the limitless opportunities it
          offers.
        </p>
      </div>
      <div className="Card">
        <div>
          <i onClick={handleButton3Click} className="fa fa-language fa-3x"></i>
        </div>
        <h1 className="head" onClick={handleButton3Click}>
          LingoRevamp
        </h1>
        <p onClick={handleButton3Click}>
          Harness the power of AI-driven text generation. Input your text and
          command, and witness our intelligent system bring your words to life.
          From captivating storytelling to generating code snippets, explore
          endless possibilities with ease. Unleash the potential of text-based
          AI and embrace a world of limitless opportunities.
        </p>
      </div>
    </div>
  );
};

export default Home;
