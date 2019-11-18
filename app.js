const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv/config');

mongoose.Promise = global.Promise;

const app = express();

const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/posts', postsRoute);
app.use('/users', usersRoute);

app.get('/', (req, res) => {
    res.send('<h1>Express homepage</h1>')
});

const connectToDatabase = () => {
    try {
        mongoose.connect(process.env.DB_CONNECTION, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });

        mongoose.connection.on('connected', () => console.log('Connected to the database.'));
        mongoose.connection.on('disconnected', () => console.log('Disconnected from database.'));
        mongoose.connection.on('error', err => console.log(err));
    } catch (error) {
        console.log('Failed connection to the database:', error)
    }
};

connectToDatabase();

app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`));