const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const carRoutes = require('./routes/carRoutes.js');

const dbUrl = 'mongodb://127.0.0.1:27017/cars';
const dbTestUrl = 'mongodb://127.0.0.1:27017/cars-test';

const url = process.env.NODE_ENV === 'test' ? dbTestUrl : dbUrl;

mongoose.connect(url)
.then(() => {
    console.log(`Mongo connection open ${url}`);
})
.catch(err => {
    console.log('Mongo connection ERROR');
    console.log(e);
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/cars', carRoutes);

app.get('/', (req, res) => {
    res.status(200);
});


app.listen(8800, () => {
    console.log("Listening on port 8800");
});

module.exports = app;