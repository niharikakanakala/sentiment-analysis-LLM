import React, { useState } from "react";
import { BASE_URL } from "./constants";

function App() {
  const [text, setText] = useState("");
  const [sentimentInfo, setSentimentInfo] = useState("");
  const [sentimentScore, setSentimentScore] = useState("");

  const analyzeSentiment = async () => {
    try {
      const response = await fetch(BASE_URL+"sentiment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
      });

      const data = await response.json();
      setSentimentInfo(data.sentimentInfo);
      setSentimentScore(data.sentimentScore);
    } catch (error) {
      console.error("Error analyzing sentiment:", error);
    }
  };

  const boxStyle = {
    maxWidth: "500px",
    margin: "0 auto",
    marginTop: "20px",
    padding: "20px",
    border: "1px solid #1976d2",
    borderRadius: "4px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  };

  const headerStyle = {
    fontSize: "24px",
    marginBottom: "20px",
  };

  const textFieldStyle = {
    width: "100%",
    marginBottom: "10px",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  };

  const buttonStyle = {
    backgroundColor: "#1976d2",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const infoBoxStyle = {
    marginTop: "20px",
    padding: "20px",
    border: "1px solid #1976d2",
    borderRadius: "4px",
  };

  const scoreBoxStyle = {
    marginTop: "20px",
    padding: "10px",
    borderRadius: "4px",
    display: "inline-block",
    color: "white",
  };

  const getScoreColor = (score) => {
    if (score > 0) {
      return "green";
    } else if (score < 0) {
      return "red";
    } else {
      return "gray";
    }
  };

  return (
    <div style={boxStyle}>
      <h4 style={headerStyle}>Sentiment Analysis App</h4>
      <textarea
        placeholder="Enter text for sentiment analysis"
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={textFieldStyle}
      />
      <button style={buttonStyle} onClick={analyzeSentiment}>
        Analyze Sentiment
      </button>
      {sentimentInfo && (
        <div style={infoBoxStyle}>
          <h2>Sentiment Info:</h2>
          <p>{sentimentInfo}</p>
          <h2 style={{ marginTop: "20px" }}>Sentiment Score:</h2>
          <div
            style={{
              ...scoreBoxStyle,
              backgroundColor: getScoreColor(sentimentScore),
            }}
          >
            <h2>{sentimentScore}</h2>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
