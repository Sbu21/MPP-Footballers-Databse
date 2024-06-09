if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ExpressError = require('./utils/ExpressError.js');
const cookieParser = require('cookie-parser');

const app = express();
const footballerRoutes = require('./routes/footballerRoutes.js');
const footballerStatsRoutes = require('./routes/footballerStatsRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

const dbUrl = 'mongodb://localhost:27017/footballers';
const dbTestUrl = 'mongodb://localhost:27017/footballers-test';

const url = process.env.NODE_ENV === 'test' ? dbTestUrl : dbUrl;

//deployment
const dbClusterUrl = process.env.DB_URL;

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

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/footballers', footballerRoutes);
app.use('/footballers/:id/footballersStats',footballerStatsRoutes);
app.use('/', userRoutes);

app.get('/', (req, res) => {
    res.status(200);
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404));
});

app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if (!err.message) {
        err.message = 'Something went wrong';
    }
    res.status(statusCode).json('Error');
})

app.listen(8800, () => {
    console.log("Listening on port 8800");
});

module.exports = app;