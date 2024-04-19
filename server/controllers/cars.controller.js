const Car = require('../models/car');

module.exports.getAllCars = async (req, res) => {
    try {
        const cars = await Car.find({});
        if (!cars) {
            res.status(404).send("Failed to get cars");
        }
        res.status(200).json(cars);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }   
}

module.exports.getCar = async (req, res) => {
    try {
         const car = await Car.findById(req.params.id)
        if (!car) {
            res.status(404).send("Car not found");
        }
        res.status(200).json(car);
    } catch (err) {
        res.status(500).send(err.message);
    }  
}

module.exports.createCar = async (req, res) => {
    try {
        const car = new Car(req.body);
        await car.save();
        res.status(201).json(car);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports.updateCar = async (req, res) => {
    try {
        const {id} = req.params;
        const car = await Car.findByIdAndUpdate(id, {... req.body}, {new: true});
        await car.save();
        res.status(200).json(car);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

module.exports.deleteCar = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedCar = await Car.findByIdAndDelete(id);
        if (!deletedCar) {
            res.status(404).send("Car not found");   
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err.message);
    } 
}
