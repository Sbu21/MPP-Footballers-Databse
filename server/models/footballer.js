const mongoose = require('mongoose');
const FootballerStats = require('./footballerStats');
const Schema = mongoose.Schema;

const footballerSchema = new Schema({
    name : String,
    age : Number,
    position : String,
    footballerStats: [
        {
            type: Schema.Types.ObjectId,
            ref: 'FootballerStats'
        }
    ]
});

footballerSchema.post('findOneAndDelete', async function (document) {
    if (document) {
        await FootballerStats.deleteMany({
            _id: {
                $in: document.footballerStats
            }
        }); 
    }
});

module.exports = mongoose.model('Footballer', footballerSchema);

