import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/FootballerAddForm.css";
import useFootballerStore from "../store/footballerStore";

export default function FootballerEditForm({footballers, updateFootballer}) {
    const { id } = useParams();
    const navigateTo = useNavigate();

    const footballer = footballers.find(footballer => footballer._id === id);

    const [formData, setFormData] = useState({
        name: footballer.name,
        age: footballer.age,
        position: footballer.position
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
        e.preventDefault();
        await updateFootballer(footballer._id, formData);
        navigateTo(`/footballers/details/${footballer._id}`);
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
        <a href={`/footballers/details/${footballer._id}`}>Go Back</a>
        </> 
    );    
}
   
