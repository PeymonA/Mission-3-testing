var express = require('express');
var router = express.Router();
var genai = require('@google/genai');

router.post('/', function(req, res, next) {
    const ai = new genai.GoogleGenAI({ apiKey: 'oops' });

    const prompt = req.body;

    async function main() {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: prompt.contents,
        });
        return response.text;
    }
    main().then(result => {
        res.send(result);
    });

    res.send("Hello from Gemini API");
});

module.exports = router;
