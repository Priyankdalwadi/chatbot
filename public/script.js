async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");

  const userMessage = input.value;
  chatBox.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
  input.value = '';

  const response = await fetch('http://localhost:5000/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: "Hi there!",
    model: 'openai/gpt-3.5-turbo'
  })
});
const data = await response.json();
console.log(data.reply); // ✅ Should show actual response


}
