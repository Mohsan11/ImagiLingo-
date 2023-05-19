import React from "react";
import "./response.css";
import Text from "./Text";
const Response = ({ data }) => {
  return data.map((data, i) => {
    return (
      <div className="response">
        <Text key={i + 1} data={data.text} />
        <br></br>
      </div>
    );
  });
};
export default Response;
