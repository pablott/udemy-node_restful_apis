// Load genres router
const genres = require('./routes/genres');
const express = require('express');
const app = express();

// Request JSON Middleware
app.use(express.json());

// Load genres router
app.use('/api/genres', genres);

/* GET */
app.get('/', (req, res) => {
    res.send('Welcome to vidly');
});


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}...`))