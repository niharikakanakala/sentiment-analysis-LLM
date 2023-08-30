const sentimentScores = {
    positive: 1,
    neutral: 0,
    negative: -1
  };

  function calculateSentimentScore(sentimentInfo) {
    // Extract sentiment category (positive, neutral, negative)
    const sentimentCategory = extractSentimentCategory(sentimentInfo);
  
    // Use sentiment scores defined earlier based on the sentiment category
    return sentimentScores[sentimentCategory];
  }
  
  function extractSentimentCategory(sentimentInfo) {
    if (sentimentInfo.includes("positive")) {
      return "positive";
    } else if (sentimentInfo.includes("negative")) {
      return "negative";
    } else {
      return "neutral";
    }
  }
  
  
  module.exports = {
    sentimentScores,
    calculateSentimentScore,
    extractSentimentCategory
  };
  