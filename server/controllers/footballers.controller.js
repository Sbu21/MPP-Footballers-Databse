const Footballer = require('../models/footballer');


module.exports.getAllFootballers = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9; 
    const offset = (page - 1) * limit;
    try {
        const footballers = await Footballer.find().skip(offset).limit(limit);
        res.status(200).json(footballers);
    } catch(error) {
        console.error(error);
        res.status(500).send('Failed to get footballers');
    }  
}

module.exports.getFootballer = async (req, res) => {
    try {
        const footballer = await Footballer.findById(req.params.id);
        res.status(200).json(footballer);
    } catch (err) {
        res.status(404).send("Footballer not found");
    }  
}

module.exports.createFootballer = async (req, res) => {
    try {
        const footballer = new Footballer(req.body);
        await footballer.save();
        res.status(201).json(footballer);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports.updateFootballer = async (req, res) => {
    try {
        const {id} = req.params;
        const footballer = await Footballer.findByIdAndUpdate(id, {...req.body}, {new: true});
        await footballer.save();
        res.status(200).json(footballer);
    } catch (err) {
        res.status(404).send("Footballer not found");
    }
}

module.exports.deleteFootballer = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedFootballer = await Footballer.findByIdAndDelete(id);
        res.status(204).send();
    } catch (err) {
        res.status(404).send("Footballer not found");
    } 
}
