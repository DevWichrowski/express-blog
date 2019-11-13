const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv/config');

mongoose.Promise = global.Promise;

const app = express();
const postsRoute = require('./routes/posts');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/posts', postsRoute);

app.get('/', (req, res) => {
    res.send('<h1>Express homepage</h1>')
});


const connectToDatabase = () => {
    try {
        mongoose.connect(process.env.DB_CONNECTION, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }, () => console.log('Connected to a database successfully.'));
    } catch (error) {
        console.log('Failed connection to the database:', error)
    }
};

connectToDatabase();

app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`));