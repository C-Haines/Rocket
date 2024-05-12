const express = require('express');
//const fetch = require('node-fetch');
const path = require('path');

const server = express();

// Configure EJS
server.set('view engine', 'ejs'); // Tell Express to use EJS
server.set('views', path.join(__dirname, 'views'));

// Basic Route
server.get('/', async (req, res) => {
    try {
        const response = await fetch('https://api.spacexdata.com/v5/launches');
        const data = await response.json();
        res.render('index', { apiData: data });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data'); // Send an error response
    }
});

// Start the server
const port = 8100; // Or any port you prefer
server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

module.exports = { server };