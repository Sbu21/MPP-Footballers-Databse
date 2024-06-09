const mongoose = require('mongoose');
const Footballer = require('../models/footballer');
const FootballerStats = require('../models/footballerStats');
const { faker } = require('@faker-js/faker');


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
    try {
        await Footballer.deleteMany({});
        await FootballerStats.deleteMany({});
        for (let i = 0; i < 200; i++) { 
            const footballer = new Footballer({
                name: faker.person.firstName(),
                age: faker.number.int({ min: 18, max: 40 }),
                position: faker.helpers.arrayElement(['Forward', 'Midfielder', 'Defender', 'Goalkeeper'])
            });

            for (let j = 0; j < 50; j++) { 
                const footballerStats = new FootballerStats({
                    season: faker.helpers.arrayElement(['2020/2021', '2021/2022', '2022/2023', '2023/2024']),
                    gamesPlayed: faker.number.int({ min: 0, max: 50 }),
                    goals: faker.number.int({ min: 0, max: 50 }),
                    assists: faker.number.int({ min: 0, max: 50 })
                });
                await footballerStats.save();
                footballer.footballerStats.push(footballerStats); 
            }
            await footballer.save();  
        }
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}
seedDb()
.then(() => {
    mongoose.connection.close();
});