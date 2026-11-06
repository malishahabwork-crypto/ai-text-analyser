require("dotenv").config();
const express = require("express");
const { analyseText } = require("./analyser");
const { validateInput } = require("./validate");

const app = express();
app.use(express.json());

app.post("/analyse", async (req, res) => {
  // Validate input
  const inputCheck = validateInput(req.body);
  if (!inputCheck.valid) {
    // 400 -> means received req but incorrect format of input
    return res.status(400).json({ error: inputCheck.error });
  }

  // Call Gemini and return result
  try {
    const result = await analyseText(req.body.text);
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Analysis failed",
      details: err.message,
    });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "AI Text Analyser is running" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
