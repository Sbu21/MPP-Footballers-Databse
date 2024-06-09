import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/FootballerAddForm.css";

export default function FootballerAddForm({addFootballer}) {
    const navigateTo = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        age: 0,
        position: ""
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

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await addFootballer(formData);
            navigateTo("/footballers");
        } catch (error) {
            console.log(error.message);
        }
        
    }

    return (
        <>
        <form className="FootballerAddForm" onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" placeholder="name" value={formData.name} onChange={handleChange} name="name" />
            <label htmlFor="age">Age</label>
            <input type="number" placeholder="age" value={formData.age} onChange={handleChange} name="age" />
            <label htmlFor="position">Position</label>
            <input type="text" placeholder="position" value={formData.position} onChange={handleChange} name="position" />
            <button type="submit">Submit</button>
        </form>
        <a href="/footballers">Go Back</a>
        </> 
    );
}