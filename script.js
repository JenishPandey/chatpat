// Get references to our new HTML elements
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatLog = document.getElementById("chat-log");

// This function sends the user's message to the backend
async function sendMessage() {
  const userText = userInput.value.trim();
  if (userText === "") {
    return; // Don't send empty messages
  }

  // Disable input and button while waiting for response
  userInput.value = "";
  sendBtn.disabled = true;

  // Display the user's message in the chat log
  appendMessage(userText, "user-message");

  try {
    // Send the user's message to our new '/api/chat' endpoint
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userText }),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Display the AI's response
    appendMessage(data.reply, "ai-message");

  } catch (error) {
    console.error("Error communicating with API:", error);
    appendMessage("Oops! Something went wrong. Please try again.", "ai-message");
  } finally {
    // Re-enable the button
    sendBtn.disabled = false;
    userInput.focus(); // Put cursor back in input box
  }
}

// Helper function to add messages to the chat log
function appendMessage(text, className) {
  const messageDiv = document.createElement("div");
  messageDiv.className = className;
  
  const messageP = document.createElement("p");
  messageP.textContent = text;
  
  messageDiv.appendChild(messageP);
  chatLog.appendChild(messageDiv);
  
  // Scroll to the bottom of the chat log
  chatLog.scrollTop = chatLog.scrollHeight;
}

// Add event listeners for the send button and the Enter key
sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});
