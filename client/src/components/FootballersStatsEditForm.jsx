import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import footballersStatsService from "../utils/footballersStatsService";
import "../css/FootballerAddForm.css";

export default function FootballerStatsEditForm({updateFootballerStat}) {
    const {id, footballersStatsId} = useParams();
    const navigateTo = useNavigate();
    const [formData, setFormData] = useState({
        season: "",
        gamesPlayed: 0,
        goals: 0,
        assists: 0
    });

    useEffect(() => {
        const fetchFootballerStats = async () => {
            try {
                const footballerStats = await footballersStatsService.getfootballersStatsById(id, footballersStatsId);
                setFormData({
                    season: footballerStats.season,
                    gamesPlayed: footballerStats.gamesPlayed,
                    goals: footballerStats.goals,
                    assists: footballerStats.assists
                })
            } catch(error) {
                console.error('Error fetching footballerStats', error);
            }
           
        }
        fetchFootballerStats();
    }, []);

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
            await updateFootballerStat(id, footballersStatsId, formData)
            navigateTo(`/footballers/details/${id}`);
        } catch (error) {
            console.log(error.message);
        }
        
    }

    return (
        <>
        <h1>Edit Service Record</h1>
        <form className="FootballerAddForm" onSubmit={handleSubmit}>
            <label htmlFor="season">Season</label>
            <input type="text" placeholder="season" value={formData.season} onChange={handleChange} name="season" />
            <label htmlFor="gamesPlayed">Games Played</label>
            <input type="number" placeholder="games played" value={formData.gamesPlayed} onChange={handleChange} name="gamesPlayed" />
            <label htmlFor="goals">Goals</label>
            <input type="number" placeholder="goals" value={formData.goals} onChange={handleChange} name="goals" />
            <label htmlFor="assists">Assists</label>
            <input type="number" placeholder="assists" value={formData.assists} onChange={handleChange} name="assists" />
            <button type="submit">Submit</button>
        </form>
        </> 
    );
}