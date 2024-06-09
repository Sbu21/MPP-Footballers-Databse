import "../css/FootballerDetails.css";
import footballerService from "../utils/footballerService";
import { useParams, useNavigate} from 'react-router-dom';
import { useState, useEffect } from "react";
import useFootballerStore from "../store/footballerStore";
import footballerStatsService from "../utils/footballersStatsService";

import FootballerStatList from "./FootballersStatsList";

export default function FootballerDetails({removeFootballer, removeFootballerStat}) {
    const { id } = useParams();
    const navigateTo = useNavigate();
    const [footballer, setFootballer] = useState(undefined);
    const [footballerStats, setFootballerStats] = useState([]);
    

    useEffect(() => {
        const fetchFootballer = async () => {
            try {
                const footballer = await footballerService.getFootballerById(id);
                setFootballer(footballer);
            } catch(error) {
                console.error('Error fetching footballer', error);
            }
           
        }

        const fetchFootballerStats = async () => {
            try {
                const fetchedFootballerStats = await footballerStatsService.getAllFootballerStatsForFootballer(id);
                setFootballerStats(fetchedFootballerStats);
            } catch(error) {
                console.error('Error fetching service records', error);
            }
            
        }

        fetchFootballer();
        fetchFootballerStats();
    }, []);

    const deleteFootballer = async () => {
        await removeFootballer(footballer._id);
        navigateTo('/footballers');
    }

    return (
        <div className="FootballerDetails">
            {footballer === undefined ? <h1>The footballer you're looking for doesn't exist</h1> :
                <div>
                    <div className="Footballer">
                        <p>Name: {footballer.name}</p>
                        <p>Age: {footballer.age}</p>
                        <p>Position: {footballer.position}</p>
                        <span className="Buttons"><button className="Delete-Button" onClick={deleteFootballer}>Delete</button> <button onClick={() => navigateTo(`/footballers/edit/${footballer._id}`)} className="Edit-Button">Edit</button></span>
                    </div>
                    <div className="FootballerStats">
                        <h2><u>Season Statistic</u></h2>
                        <FootballerStatList footballerStats={footballerStats} footballerId={id} removeFootballerStat={removeFootballerStat}></FootballerStatList>
                        <button onClick={() => navigateTo(`/footballers/${footballer._id}/footballersStats/add`)}>Add Season Statistic</button>
                    </div> 
                </div>
            }
            <a className="Back-Link" href="/footballers">Go Back</a>
        </div>
    );
}