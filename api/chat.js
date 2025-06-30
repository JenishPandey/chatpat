// UPDATED BACKEND CODE for api/chat.js

import { GoogleGenerativeAI } from "@google/generative-ai";

// This function handles the incoming request.
export default async function handler(req, res) {
  // We only allow POST requests for this endpoint.
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Extract the user's message from the request body.
    const { message } = req.body;

    // If the user sends no message, return an error.
    if (!message) {
      return res.status(400).json({ error: 'Message is required.' });
    }

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const generationConfig = {
      temperature: 0.7, // A bit of creativity, but still coherent.
    };

    // --- This is the key part! ---
    // We create a "system instruction" and combine it with the user's message.
    const finalPrompt = `SYSTEM INSTRUCTION: You are Chatpat, the spicy speaker. Your responses must always start with "Namaste" and nothing else before it. You only know how to speak in nepali chat eg "Namaste, ma sanchai chu...". be very expressive. keep it short and sweet. no need to translate yourself to english Be friendly, a little sassy, and helpful. USER QUESTION: "${message}"`;

    // Generate content based on the combined prompt.
    const result = await model.generateContent(finalPrompt, generationConfig);
    const response = await result.response;
    const aiText = response.text();

    // Send the AI's response back to the frontend.
    res.status(200).json({ reply: aiText });

  } catch (error) {
    console.error("Error in chat API:", error);
    res.status(500).json({ error: "Failed to get a response from the AI." });
  }
}
