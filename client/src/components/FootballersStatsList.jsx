import '../css/FootballersStatList.css'
import { useNavigate } from 'react-router-dom';

export default function FootballerStatsList({footballerStats, footballerId, removeFootballerStat}) {
    const navigateTo = useNavigate();

    const deleteFootballerStats = async (id) => {
        await removeFootballerStat(footballerId, id);
    }

    return (
        <>
            <ul className="FootballerStatsList">
                {footballerStats.map((footballersStats) => (
                <li key={footballersStats._id}>
                    <p>
                    Season: {footballersStats.season} | 
                    Games Played: {footballersStats.gamesPlayed} | 
                    Goals: {footballersStats.goals} | 
                    Assists: {footballersStats.assists}
                    <button onClick={() => deleteFootballerStats(footballersStats._id)}>Delete</button>
                    <button onClick={() => navigateTo(`/footballers/${footballerId}/footballersStats/edit/${footballersStats._id}`)}>Edit</button>
                    </p>
                </li>
                 ))}
            </ul>
        </> 
    );
}