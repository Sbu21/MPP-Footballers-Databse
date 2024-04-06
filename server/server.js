const express = require('express');
const mongoose = require('mongoose');


const app = express();
const carRoutes = require('./routes/carRoutes.js');

mongoose.connect('mongodb://127.0.0.1:27017/cars')
.then(() => {
    console.log('Mongo connection open');
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


app.use('/cars', carRoutes);

app.get('/', (req, res) => {
    res.status(200);
});


app.listen(8800, () => {
    console.log("Listening on port 8800");
});

