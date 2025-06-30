// UPDATED BACKEND CODE for api/generate-joke.js

// Import the Google AI library
const { GoogleGenerativeAI } = require("@google/generative-ai");

// This is the main function that will be executed when someone visits our API endpoint
export default async function handler(req, res) {
  // Use a try-catch block to handle potential errors gracefully
  try {
    // 1. A-C-C-E-S-S   T-H-E   A-P-I   K-E-Y
    // We get the API key from Vercel's Environment Variables.
    // This is the most secure way to handle secret keys.
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    // 2. S-E-L-E-C-T   T-H-E   M-O-D-E-L
    // We are now using 'gemini-1.5-flash', which is fast and optimized for the free tier.
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 3. C-R-A-F-T   T-H-E   P-R-O-M-P-T
    // The prompt is our instruction to the AI.
    const prompt = "Tell me a short, clean, one-liner programmer joke. It should be suitable for all audiences.";

    // 4. G-E-N-E-R-A-T-E   T-H-E   J-O-K-E
    // Ask the AI to generate content based on our prompt.
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const jokeText = response.text();

    // 5. S-E-N-D   T-H-E   R-E-S-P-O-N-S-E
    // Send the generated joke back to the frontend as a JSON object with a 200 OK status.
    res.status(200).json({ joke: jokeText });

  } catch (error) {
    // 6. H-A-N-D-L-E   E-R-R-O-R-S
    // If anything in the 'try' block fails, this code will run.
    // We log the detailed error to the Vercel server logs for debugging.
    console.error("Error in generate-joke API:", error);

    // We send a generic, user-friendly error message back to the frontend.
    res.status(500).json({ error: "Failed to generate joke. Please check the server logs." });
  }
}
