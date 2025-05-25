const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: message }] }]
      }),
    });

    const data = await response.json();

    if (data && data.candidates && data.candidates.length > 0) {
      const reply = data.candidates[0].content.parts[0].text;
      res.json({ reply });
    } else {
      res.status(500).json({ reply: "No response from Gemini API" });
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ reply: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
