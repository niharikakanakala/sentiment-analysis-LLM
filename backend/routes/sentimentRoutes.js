const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
const { calculateSentimentScore } = require('./sentimentScores');
const app = require('../app'); // Import the app instance

const router = express.Router();

const OPENAI_API_KEY = 'add your key here';

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const sentimentAnalysisPrompt = "Please classify the sentiment expressed in the following sentence as positive, neutral or negative. More information should be provided on the mood and tone: ";

router.post("/sentiment", async (req, res) => {
    const text = req.body.text;
  
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: sentimentAnalysisPrompt + text + ".",
        temperature: 0,
        max_tokens: 60,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
    
      if (response.data && response.data.choices && response.data.choices[0] && response.data.choices[0].text) {
        const sentimentInfo = response.data.choices[0]["text"].toLowerCase();
        const sentimentScore = calculateSentimentScore(sentimentInfo);
    
        res.send({ sentimentInfo, sentimentScore });
      } else {
        console.error('Unexpected API response:', response);
        res.status(500).json({ error: 'Unexpected API response' });
      }
    } catch (error) {
      console.error('Error analyzing sentiment:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
    
  });
  
module.exports = router;
