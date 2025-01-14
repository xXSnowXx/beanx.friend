const chatButton = document.getElementById('chat-button');
const userInput = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');
const loading = document.getElementById('loading');
const personaSelect = document.getElementById('persona');

// Function for typewriter effect (already implemented)
function typeWriterEffect(element, text, delay = 50) {
    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
        }
    }, delay);
}

chatButton.addEventListener('click', async () => {
    const userMessage = userInput.value;
    const selectedPersona = personaSelect.value;

    if (!userMessage) return;

    chatBox.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
    userInput.value = '';
    loading.style.display = 'block';

    try {
        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage, persona: selectedPersona }),
        });

        const data = await response.json();

        const botMessage = document.createElement('p');
        botMessage.innerHTML = `<strong>Bot:</strong> `;
        chatBox.appendChild(botMessage);

        typeWriterEffect(botMessage, data.reply);
    } catch (error) {
        console.error(error);
        chatBox.innerHTML += `<p><strong>Error:</strong> Something went wrong. Please try again later.</p>`;
    } finally {
        loading.style.display = 'none';
    }
});
