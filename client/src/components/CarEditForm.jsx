import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/CarAddForm.css";

export default function CarEditForm({cars, updateCar}) {
    const { id } = useParams();
    const car = cars.find(car => car.id === id);
    const navigateTo = useNavigate();
    if (car !== undefined) {
        const [formData, setFormData] = useState({
        make: car.make,
        model: car.model,
        year: car.year,
        price: car.price,
        image: car.image
    });
    const handleChange = (event) => {
        const changedField = event.target.name;
        const newValue = event.target.value;
        setFormData(currentData => {
            return {
                ...currentData,
                [changedField]:newValue
            }
        });
    }

    const handleSubmit = () => {
        console.log(formData);
        updateCar(car.id, formData);
        navigateTo(`/cars/details/${car.id}`);
    }

    return (
        <>
        <form className="CarAddForm">
            <label htmlFor="make">Make</label>
            <input type="text" placeholder="make" value={formData.make} onChange={handleChange} name="make" />
            <label htmlFor="model">Model</label>
            <input type="text" placeholder="model" value={formData.model} onChange={handleChange} name="model" />
            <label htmlFor="year">Year</label>
            <input type="text" placeholder="year" value={formData.year} onChange={handleChange} name="year" />
            <label htmlFor="price">Price</label>
            <input type="text" placeholder="price" value={formData.price} onChange={handleChange} name="price" />
            <label htmlFor="image">Image URL</label>
            <input type="text" placeholder="image" value={formData.image} onChange={handleChange} name="image" />
            <button onClick={handleSubmit}>Submit</button>
        </form>
        <a href={`/cars/details/${car.id}`}>Go Back</a>
        </>
        
    );
    }
    else {
        return <h1>The car you're looking for doesn't exist</h1>
    }
}