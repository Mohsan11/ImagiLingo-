import React from "react";
import "./response.css";
import Text from "./Text";

const Response = ({ data }) => {
  return data.map((data, i) => {
    return (
      <div className="response" key={i + 1}>
        <Text data={data.text} />
      </div>
    );
  });
};

export default Response;
