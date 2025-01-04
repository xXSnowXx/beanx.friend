const chatButton = document.getElementById('chat-button');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

chatButton.addEventListener('click', async () => {
    const userMessage = userInput.value;
    if (!userMessage) return;

    chatBox.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
    userInput.value = '';

    try {
        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        chatBox.innerHTML += `<p><strong>Bot:</strong> ${data.reply}</p>`;
    } catch (error) {
        chatBox.innerHTML += `<p><strong>Error:</strong> Failed to fetch response.</p>`;
        console.error(error);
    }
});
