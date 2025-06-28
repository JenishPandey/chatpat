// Get references to our HTML elements
const generateBtn = document.getElementById("generate-btn");
const jokeText = document.getElementById("joke-text");

// This function will be called when the button is clicked
async function getJoke() {
  // --- Show a loading state ---
  jokeText.textContent = "Thinking of a good one...";
  generateBtn.disabled = true; // Disable the button so it can't be clicked again

  try {
    // The 'fetch' function sends a request to our backend API.
    // We are asking for the '/api/generate-joke' endpoint we created.
    const response = await fetch('/api/generate-joke');

    // If the server responded with an error, we'll handle it here
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    // Get the JSON data from the response
    const data = await response.json();

    // Display the joke!
    jokeText.textContent = data.joke;

  } catch (error) {
    // If anything went wrong during the fetch, show an error message
    console.error("Error fetching joke:", error);
    jokeText.textContent = "Oops! I couldn't get a joke. Please try again.";
  } finally {
    // --- Reset the button ---
    // This 'finally' block runs whether the request succeeded or failed.
    generateBtn.disabled = false; // Re-enable the button
  }
}

// Attach the 'getJoke' function to the button's 'click' event
generateBtn.addEventListener("click", getJoke);
