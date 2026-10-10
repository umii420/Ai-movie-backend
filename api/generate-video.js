const fetch = require('node-fetch');

module.exports = async (req, res) => {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { prompt } = req.body || {};
        const LUMA_API_KEY = process.env.LUMA_API_KEY || "luma-api-3unAWbv3RGzfX0rlq1jOYIM_4HwZEYqBlACUTg5ZKkY";

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
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
                  
