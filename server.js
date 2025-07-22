const express = require('express');
const cors = require('cors');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('./config');

const app = express();
const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const medicalPrompt = `You are a medical assistant chatbot. Your role is to provide helpful, accurate, and safe medical information. Always remind users to consult with healthcare professionals for serious medical concerns. Be informative but cautious in your responses.`;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!config.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: 'API key not configured. Please set GEMINI_API_KEY environment variable.' 
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    const fullPrompt = `${medicalPrompt}\n\nUser question: ${message}\n\nPlease provide a helpful medical response:`;
    
    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    res.json({ 
      response: text,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error:', error);
    
    if (error.message.includes('API_KEY')) {
      res.status(500).json({ 
        error: 'Invalid API key. Please check your GEMINI_API_KEY configuration.',
        details: error.message 
      });
    } else if (error.message.includes('quota')) {
      res.status(500).json({ 
        error: 'API quota exceeded. Please try again later.',
        details: error.message 
      });
    } else if (error.message.includes('model')) {
      res.status(500).json({ 
        error: 'Model not available. Please check the model name.',
        details: error.message 
      });
    } else {
      res.status(500).json({ 
        error: 'Failed to generate response. Please try again.',
        details: error.message 
      });
    }
  }
});

app.listen(config.PORT, () => {
  console.log(`Medical chatbot server running on port ${config.PORT}`);
  console.log(`Open http://localhost:${config.PORT} in your browser`);
  console.log(`API Key configured: ${config.GEMINI_API_KEY ? 'Yes' : 'No'}`);
}); 