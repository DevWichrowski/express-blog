const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv/config');


const app = express();

const connectToDatabase = () => {
    try {
        mongoose.connect(process.env.DATABASE_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }, () => console.log('Connected to a database successfully.'));
    } catch (error) {
        console.log('Failed connection to the database:', error)
    }
};

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('<h1>Express homepage</h1>')
});

connectToDatabase();

app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`));