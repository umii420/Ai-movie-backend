const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const LUMA_API_KEY = process.env.LUMA_API_KEY || "luma-api-3unAWbv3RGzfX0rlq1jOYIM_4HwZEYqBlACUTg5ZKkY";

app.post('/api/generate-video', async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await fetch("https://agents.lumalabs.ai/v1/generations", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${LUMA_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: prompt,
                model: "uni-1",
                type: "image",
                aspect_ratio: "16:9"
            })
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
