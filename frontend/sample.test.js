import React from "react";
// const fetch = require('node-fetch');
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./src/App";
import { BASE_URL } from "./src/constants";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        sentimentInfo: "Positive",
        sentimentScore: 1,
      }),
  })
);
test("analyzeSentiment sets sentiment info and score on successful API response", async () => {
  const { getByText, getByPlaceholderText } = render(<App />);
  const input = getByPlaceholderText("Enter text for sentiment analysis");
  const button = getByText("Analyze Sentiment");

  fireEvent.change(input, { target: { value: "Positive sentiment" } });
  fireEvent.click(button);

  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(1); // Ensure fetch is called
    expect(fetch).toHaveBeenCalledWith(
      BASE_URL+"sentiment",
      expect.objectContaining({
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
    );
    
    // Assert that sentiment info and score are updated
    const sentimentInfo = getByText("Positive");
    const sentimentScore = getByText("1");
    expect(sentimentInfo).toBeInTheDocument;
    expect(sentimentScore).toBeInTheDocument;
  });
});

test("renders with initial state", () => {
  render(<App />);
  const analyzeButton = screen.getByText(/Analyze Sentiment/i);
  expect(analyzeButton).toBeInTheDocument;
  expect(screen.queryByText(/Sentiment Info:/i)).toBeNull();
});


describe("getScoreColor function", () => {
  const getScoreColor = (score) => {
    if (score > 0) {
      return "green";
    } else if (score < 0) {
      return "red";
    } else {
      return "gray";
    }
  };
  
  it("returns 'green' for a positive score", () => {
    const result = getScoreColor(1);
    expect(result).toBe("green");
  });

  it("returns 'red' for a negative score", () => {
    const result = getScoreColor(-1);
    expect(result).toBe("red");
  });

  it("returns 'gray' for a neutral score (0)", () => {
    const result = getScoreColor(0);
    expect(result).toBe("gray");
  });
});