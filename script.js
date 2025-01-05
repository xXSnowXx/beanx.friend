const chatButton = document.getElementById('chat-button');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

chatButton.addEventListener('click', async () => {
    const userMessage = userInput.value;
    if (!userMessage) return;

    chatBox.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
    userInput.value = '';

    chatBox.innerHTML += `<p><strong>Bot:</strong> Onii-chan, the backend isn't ready yet... 💬</p>`;
});
