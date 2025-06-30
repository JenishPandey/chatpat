// UPDATED BACKEND CODE with max temperature for randomness

// Import the Google AI library
const { GoogleGenerativeAI } = require("@google/generative-ai");

// This is the main function that will be executed when someone visits our API endpoint
export default async function handler(req, res) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // --- NEW: Define our Generation Configuration ---
    // We create a configuration object to control the AI's creativity.
    const generationConfig = {
      // Temperature controls the randomness. 0.0 is deterministic, 2.0 is max creativity.
      temperature: 2.0,
    };

    const prompt = "Tell me a short, clean, one-liner joke. It should be suitable for all audiences.";

    // --- UPDATED: Pass the configuration along with the prompt ---
    // We now send a structured request object to the model.
    // This object contains both the prompt (as 'contents') and our new 'generationConfig'.
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: generationConfig, // <-- Our new setting is included here!
    });

    const response = await result.response;
    const jokeText = response.text();

    // Send the generated joke back to the frontend
    res.status(200).json({ joke: jokeText });

  } catch (error) {
    // If something goes wrong, log the error and send a 500 status code
    console.error("Error in generate-joke API:", error);
    res.status(500).json({ error: "Failed to generate joke. Please check the server logs." });
  }
}
