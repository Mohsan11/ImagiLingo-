import React from "react";
import "./Content.css";

const Content = ({ data }) => {
  if (!data) {
    return null; // Add a check to handle the initial loading state
  }

  return (
    <div className="result">
      <div className="resultText">
        <h3 className="summary">Summary</h3>
        <p className="text">{data.data.summary}</p>
      </div>
      <img src={data.imageUrl} alt={data.imageUrl} className="resultImg" />
      {data.data2 && Array.isArray(data.data2.suggestions) ? (
        <div className="suggestion">
          <h3 className="summary">Suggestions</h3>
          {data.data2.suggestions.map((suggestion, index) => (
            <p className="text suggestion-card" key={index}>
              <strong>{index + 1}</strong>. {suggestion.text}
            </p>
          ))}
        </div>
      ) : (
        <p className="no-suggestions">No suggestions available.</p>
      )}
    </div>
  );
};

export default Content;
