// Validates the incoming request body
function validateInput(body) {
  if (!body.text || typeof body.text !== "string") {
    return { valid: false, error: "Missing or invalid 'text' field" };
  }
  if (body.text.trim().length < 20) {
    return { valid: false, error: "Text is too short to analyse" };
  }
  return { valid: true };
}

// Validates the structure coming back from Gemini
function validateOutput(parsed) {
  const hasMainTopic = typeof parsed.main_topic === "string";
  const hasSummary = typeof parsed.summary === "string";
  const hasKeywords =
    Array.isArray(parsed.keywords) && parsed.keywords.length === 3;

  if (!hasMainTopic || !hasSummary || !hasKeywords) {
    return { valid: false, error: "AI response is missing required fields" };
  }
  return { valid: true };
}

module.exports = { validateInput, validateOutput };


