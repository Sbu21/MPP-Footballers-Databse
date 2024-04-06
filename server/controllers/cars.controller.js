const Car = require('../models/car');

module.exports.getAllCars = async (req, res) => {
    try {
        const cars = await Car.find({});
        res.json(cars).status(200);
    } catch (err) {
        console.log(err);
        res.status(404).send("Failed to get cars");
    }   
}

module.exports.getCar = async (req, res) => {
    const car = await Car.findById(req.params.id)
    if (!car) {
        res.status(404).send("Car not found");
    }
    res.json(car).status(200);
}

module.exports.createCar = async (req, res) => {
    try {
        const car = new Car(req.body);
        await car.save();
        res.status(201).json(car);
    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports.updateCar = async (req, res) => {
    try {
        const {id} = req.params;
        const car = await Car.findByIdAndUpdate(id, {... req.body}, {new: true});
        await car.save();
        res.status(200).json(car);
    } catch (err) {
        res.status(404).send("Car not found");
    }
}

module.exports.deleteCar = async (req, res) => {
    try {
        const {id} = req.params;
        await Car.findByIdAndDelete(id);
        res.status(204).send();
    } catch (err) {
        res.status(404).send("Car not found")
    } 
}
