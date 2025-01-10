const chatButton = document.getElementById('chat-button');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const loading = document.getElementById('loading'); // Optional loading indicator

chatButton.addEventListener('click', async () => {
    const userMessage = userInput.value;
    if (!userMessage) return;

    chatBox.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
    userInput.value = '';
    loading.style.display = 'block';

    try {
        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        chatBox.innerHTML += `<p><strong>Bot:</strong> ${data.reply}</p>`;
    } catch (error) {
        console.error(error);
        chatBox.innerHTML += `<p><strong>Error:</strong> Something went wrong. Please try again later.</p>`;
    } finally {
        loading.style.display = 'none';
    }
});
