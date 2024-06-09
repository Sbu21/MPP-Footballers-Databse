const Footballer = require('../models/footballer');
const FootballerStats = require('../models/footballerStats');

module.exports.getAllFootballerStatsForFootballer = async (req, res) => {
    try {
        const {id} = req.params;
        const footballer = await Footballer.findById(id).populate('footballerStats');
        if (!footballer) {
            return res.status(404).json({ error: "Footballer stats not found" });
        }
        res.status(200).json(footballer.footballerStats);
    } catch (error) {
        console.error("Error in getAllFootballerStatsForFootballer:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports.getFootballerStatsById = async (req,res) => {
    const {footballerStatsId} = req.params;
    const footballerStats = await FootballerStats.findById(footballerStatsId);
    res.status(200).json(footballerStats);
}

module.exports.createFootballerStats = async (req, res) => {
    const {id} = req.params;
    const footballer = await Footballer.findById(id);
    const footballerStats = new FootballerStats(req.body);
    footballer.footballerStats.push(footballerStats);
    await footballerStats.save();
    await footballer.save();
    res.status(200).json(footballerStats);
}

module.exports.updateFootballerStats = async (req, res) => {
    const {footballerStatsId} = req.params;
    const footballerStats = await FootballerStats.findByIdAndUpdate(footballerStatsId, {... req.body}, {new: true})
    await footballerStats.save();
    res.status(200).json(footballerStats);
}

module.exports.deleteFootballerStats = async (req, res) => {
    const {id, footballerStatsId} = req.params;
    await Footballer.findByIdAndUpdate(id, {$pull: {FootballerStats: footballerStatsId}});
    await FootballerStats.findByIdAndDelete(footballerStatsId);
    res.status(204);
}