const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv/config');


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('<h1>Express homepage</h1>')
});

app.listen(3000, () => console.log('Listening on port 3000'));