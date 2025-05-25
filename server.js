// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const GROK_API_KEY = process.env.GROK_API_KEY;

// Dummy example POST endpoint to call Grok API
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  try {
    // Replace URL and payload below with actual Grok API details
    const response = await fetch('https://api.x.ai/v1/chat/completions ', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'grok-3',   // example model name
        messages: [{ role: 'user', content: message }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(500).json({ reply: `API Error: ${errText}` });
    }

    const data = await response.json();
    // Assuming Grok's API returns a similar structure to OpenAI
    const reply = data.choices?.[0]?.message?.content || "No reply from API.";
    res.json({ reply });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ reply: "Server error" });
  }
});

app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
