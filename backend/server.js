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
        
        const today = new Date();
        const dateFrom = today.toISOString().slice(0, 10);
        const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
        const dateTo = nextWeek.toISOString().slice(0, 10);

        const response = await fetch(`https://api.football-data.org/v4/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`, {
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