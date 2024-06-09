const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');

const footballerStats = require('../controllers/footballersStats.controller');

router.route('/')
.get(footballerStats.getAllFootballerStatsForFootballer)
.post(footballerStats.createFootballerStats);

router.route('/:footballerStatsId')
.get(footballerStats.getFootballerStatsById)
.put(footballerStats.updateFootballerStats)
.delete(footballerStats.deleteFootballerStats);

module.exports = router;