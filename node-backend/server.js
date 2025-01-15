// server.js

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { OpenAI } = require('openai');


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health Check Route
app.get('/', (req, res) => {
    res.send('beanx.friend backend is running smoothly 🚀');
});


// Initialize OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/chat', async (req, res) => {
    const { message, persona } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    const personaPrompts = {
        friendly: 'You are a friendly and cheerful AI assistant named Beanx.',
        serious: 'You are a serious and professional AI assistant named Beanx.',
        sassy: 'You are a sassy and witty AI assistant named Beanx. Add playful snark to your responses.',
    };

    const systemMessage = personaPrompts[persona] || personaPrompts['friendly'];

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: systemMessage },
                { role: 'user', content: message },
            ],
        });

        res.json({ reply: response.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to connect to OpenAI API' });
    }
});
