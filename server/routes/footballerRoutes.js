const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');

const footballers = require('../controllers/footballers.controller')

router.route('/')
.get(footballers.getAllFootballers)
.post(footballers.createFootballer);

router.route('/:id')
.get(footballers.getFootballer)
.put(footballers.updateFootballer)
.delete(footballers.deleteFootballer);


module.exports = router;