const request = require('supertest');
const assert = require('assert');
const app = require('./app'); // Assuming your app instance is exported from app.js
const {
  sentimentScores,
  calculateSentimentScore,
  extractSentimentCategory,
} = require('./routes/sentimentScores');
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const mock = new MockAdapter(axios);

describe('Sentiment Analysis', () => {
  it('should correctly calculate positive sentiment score', () => {
    const sentimentInfo = "positive";
    const expectedScore = sentimentScores.positive;
    const calculatedScore = calculateSentimentScore(sentimentInfo);
  
    console.log("Sentiment Info:", sentimentInfo);
    console.log("Expected Score:", expectedScore);
    console.log("Calculated Score:", calculatedScore);
  
    assert.strictEqual(calculatedScore, expectedScore);
  });

  it('should correctly calculate neutral sentiment score', () => {
    const sentimentInfo = "The event was neither good nor bad.";
    const expectedScore = sentimentScores.neutral;
    const calculatedScore = calculateSentimentScore(sentimentInfo);
    assert.strictEqual(calculatedScore, expectedScore);
  });

  it('should correctly calculate negative sentiment score', () => {
    const sentimentInfo = "I am really disappointed with the quality as it is negative and the sentiment expressed is one of disappointment and dissatisfaction.";
    const expectedScore = sentimentScores.negative;
    const calculatedScore = calculateSentimentScore(sentimentInfo);
    assert.strictEqual(calculatedScore, expectedScore);
  });

  it('should extract positive sentiment category', () => {
    const sentimentInfo = "Feeling positive about the outcome.";
    const expectedCategory = "positive";
    const extractedCategory = extractSentimentCategory(sentimentInfo);
    assert.strictEqual(extractedCategory, expectedCategory);
  });

  it('should extract neutral sentiment category', () => {
    const sentimentInfo = "No strong feelings either way.";
    const expectedCategory = "neutral";
    const extractedCategory = extractSentimentCategory(sentimentInfo);
    assert.strictEqual(extractedCategory, expectedCategory);
  });

  it('should extract negative sentiment category', () => {
    const sentimentInfo = "negative. the mood and tone are aggressive and hostile.";
    const expectedCategory = "negative";
    const extractedCategory = extractSentimentCategory(sentimentInfo);
    assert.strictEqual(extractedCategory, expectedCategory);
  });
  
  it('should handle mixed sentiment information', () => {
    const sentimentInfo = "I have mixed feelings about this.";
    const expectedCategory = "neutral"; // Since "neutral" keyword appears before "positive"
    const extractedCategory = extractSentimentCategory(sentimentInfo);
    assert.strictEqual(extractedCategory, expectedCategory);
  });

  it('should default to neutral sentiment category for unknown cases', () => {
    const sentimentInfo = "Random information without sentiment keywords.";
    const expectedCategory = "neutral";
    const extractedCategory = extractSentimentCategory(sentimentInfo);
    assert.strictEqual(extractedCategory, expectedCategory);
  });
});

