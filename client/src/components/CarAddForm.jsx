import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CarAddForm.css";

export default function CarAddForm({cars, addCar}) {
    const navigateTo = useNavigate();
    const [formData, setFormData] = useState({
        make: "",
        model: "",
        year: "",
        price: "",
        image: ""
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
        addCar(formData);
        navigateTo("/cars")
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
        <a href="/cars">Go Back</a>
        </>
        
    );
}