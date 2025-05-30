const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3001;


app.use(cors());


app.use(express.static(path.join(__dirname, '../frontend')));


app.get('/api/matches', async (req, res) => {
    try {
        const response = await fetch('https://api.football-data.org/v4/matches?dateFrom=2025-05-30&dateTo=2025-06-05', {
            headers: {
                'X-Auth-Token': process.env.FOOTBALL_API_KEY 
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching matches:', error);
        res.status(500).json({ error: 'Failed to fetch matches' });
    }
})
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 