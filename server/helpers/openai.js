const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function analyzeEmailContent(content) {
    const response = await openai.completions.create({
        model: "text-davinci-003",
        prompt: `Classify the following email content: ${content}\n\nLabels: Interested, Not Interested, More information`,
        max_tokens: 10,
    });
    return response.choices[0].text.trim();
}

async function generateResponse(label, emailContent) {
    const prompt = `Given the email content "${emailContent}", provide an appropriate response for the label "${label}".`;
    const response = await openai.completions.create({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 150,
    });
    return response.choices[0].text.trim();
}

module.exports = {
    analyzeEmailContent,
    generateResponse
};
