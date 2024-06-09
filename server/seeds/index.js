const mongoose = require('mongoose');
const Footballer = require('../models/footballer');
const FootballerStats = require('../models/footballerStats');

mongoose.connect('mongodb://localhost:27017/footballers')
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

const seedDb = async () => {
    await Footballer.deleteMany({});
    await FootballerStats.deleteMany({});

    const footballerStats1 = new FootballerStats({gamesPlayed: 10, goals: 5, assists: 3});
    await footballerStats1.save();
    const footballerStats2 = new FootballerStats({gamesPlayed: 20, goals: 10, assists: 5});
    await footballerStats2.save();
    const footballerStats3 = new FootballerStats({gamesPlayed: 30, goals: 15, assists: 10});
    await footballerStats3.save();
    const footballerStats4 = new FootballerStats({gamesPlayed: 40, goals: 20, assists: 15});
    await footballerStats4.save();

    const footballer1 = new Footballer({name: 'Cristiano Ronaldo', age: 36, position: 'Forward', footballerStats: footballerStats1});
    await footballer1.save();
    const footballer2 = new Footballer({name: 'Lionel Messi', age: 34, position: 'Forward', footballerStats: footballerStats2});
    await footballer2.save();
    const footballer3 = new Footballer({name: 'Robert Lewandowski', age: 32, position: 'Forward', footballerStats: footballerStats3});  
    await footballer3.save();
    const footballer4 = new Footballer({name: 'Mohamed Salah', age: 29, position: 'Forward', footballerStats: footballerStats4});
    await footballer4.save();
}

seedDb()
.then(() => {
    mongoose.connection.close();
});