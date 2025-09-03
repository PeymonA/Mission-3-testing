var express = require('express');
var router = express.Router();
var genai = require('@google/genai');

const ai = new genai.GoogleGenAI({ apiKey: 'apikey' });

/* POST users listing. */
router.post('/', function(req, res, next) {
  const newUser = req.body;
  main(newUser).then(result => {
      res.send({
        "output" : result
      });
  });
});

async function main(newUser) {
  const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: newUser.content,
  });
  return response.text;
}

module.exports = router;

