const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    make: String,
    model: String,
    year: String,
    price: Number,
    image: String
});

module.exports = mongoose.model('Car', carSchema);

