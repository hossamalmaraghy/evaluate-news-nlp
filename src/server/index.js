var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const punycode = require('punycode');
dotenv.config();    // Load environment variables from .env file

const app = express();

const cors = require('cors');

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the dist directory (updated from 'src/client')
app.use(express.static('dist'));

// Home route to serve index.html from dist
app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'));
});

// POST Route for MeaningCloud Sentiment Analysis
app.post('/analyze', async (req, res) => {
    const meaningcloudAPIKey = process.env.API_KEY;  // Load the API key from the environment variables
    const text = req.body.text;  // Get the text from the request body (client-side input)

    const url = `https://api.meaningcloud.com/sentiment-2.1?key=${meaningcloudAPIKey}&lang=en&txt=${encodeURIComponent(text)}`;

    try {
        const response = await fetch(url, { method: 'POST' });
        const data = await response.json();
        res.send(data);  // Send the MeaningCloud API response back to the client
    } catch (error) {
        console.error('Error calling MeaningCloud API:', error);
        res.status(500).send('Error analyzing sentiment');
    }
});

// Designate the port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Server is listening on port 8000');
});
