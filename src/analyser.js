const { GoogleGenerativeAI } = require("@google/generative-ai");
const { validateOutput } = require("./validate");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function analyseText(text) {
  const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite" });

  const prompt = `
    Analyse the following text and respond ONLY with a valid JSON object.
    No explanation, no markdown, no code blocks. Just raw JSON.

    The JSON must have exactly these fields:
    {
      "main_topic": "one short phrase describing the main topic",
      "summary": "a 2-3 sentence summary of the text",
      "keywords": ["keyword1", "keyword2", "keyword3"]
    }

    Text to analyse:
    "${text}"
  `;

  const result = await model.generateContent(prompt);
  const rawText = result.response.text().trim();

  // Parse the JSON response
  let parsed;
  try {
    parsed = JSON.parse(rawText);
  } catch (err) {
    throw new Error("AI returned invalid JSON: " + rawText);
  }

  // Validate the structure
  const check = validateOutput(parsed);
  if (!check.valid) {
    throw new Error(check.error);
  }

  return parsed;
}

module.exports = { analyseText };