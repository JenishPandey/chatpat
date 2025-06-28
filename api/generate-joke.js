// This is our backend file. It is a "serverless function".
// It runs on Vercel's servers, not in the user's browser.

// Import the Google AI library
const { GoogleGenerativeAI } = require("@google/generative-ai");

// This is the main function that will be executed when someone visits our API endpoint
export default async function handler(req, res) {
  try {
    // We get the API key from an environment variable.
    // This is a secure way to store the key. We will set this up in Vercel later.
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    // Specify the model we want to use
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // The prompt is our instruction to the AI
    const prompt = "Tell me a short, clean, one-liner joke. It should be suitable for all audiences. For example: Why don't scientists trust atoms? Because they make up everything!";

    // Ask the AI to generate content based on our prompt
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jokeText = response.text();

    // Send the generated joke back to the frontend as a JSON object
    res.status(200).json({ joke: jokeText });

  } catch (error) {
    // If something goes wrong, log the error and send a 500 status code
    console.error(error);
    res.status(500).json({ error: "Failed to generate joke. Please check the server logs." });
  }
}
