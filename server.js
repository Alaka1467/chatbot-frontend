const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini with your API Key from the .env file
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    // This part talks to Gemini
    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const reply = response.text();

    res.json({ reply });

  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ reply: `Gemini is having trouble thinking right now. ${error}` });
  }
});

app.listen(3000, () => {
  console.log("🚀 Server running on port 3000 - Gemini is ready!");
});