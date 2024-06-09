import "../css/FootballerList.css"
import FootballerItem from "./FootballerItem";
import { CSVLink } from "react-csv";
import { useState } from "react";

export default function FootballerList({footballers, sortFootballers, deleteSelected}) {

    const [isShowing, setIsShowing] = useState(false);
    const [selectedFootballers, setSelectedFootballers] = useState([]);

    const toggleShowing = () => {
        setIsShowing(!isShowing);
    }

    const handleCheck = (footballerId) => {
        const isSelected = selectedFootballers.includes(footballerId);
        setSelectedFootballers(prevSelectedFootballers => isSelected ? prevSelectedFootballers.filter(id => id !== footballerId) : [...prevSelectedFootballers, footballerId]);
    }

    const handleDelete = () => {
        deleteSelected(selectedFootballers);
        setIsShowing(false);
    }

    return (
        <div className="Footballers">
            <h1>Footballers Available</h1>
            <header className="Header">
                <button onClick={sortFootballers}>Sort Footballers</button>
                <button onClick={toggleShowing} className="BulkDelete">{isShowing ? "Cancel" : "Bulk Delete"}</button>
                <CSVLink className="CSVLink" data={footballers}>Download footballers data</CSVLink>
            </header>
            
            <ul className="FootballerList">
                {footballers.map((footballer) => (
                <li key={footballer._id} className="FootballerList-Item">
                   <FootballerItem footballer={footballer}/>
                    <a href={`/footballers/details/${footballer._id}`}>Details</a>
                    <input type="checkbox" className={isShowing ? "ShowCheckbox" : "HideCheckbox"} checked={selectedFootballers.includes(footballer._id)} onChange={() => handleCheck(footballer._id)}/> 
                </li>
                ))}
                <li key="last-1" className="FootballerList-Item-Last"></li>
                <li key="last-2" className="FootballerList-Item-Last"></li>
            </ul>
            <div className={isShowing ? "DeleteAllShow" : "DeleteAllHide"}>
                <button className="DeleteAllBtn" onClick={handleDelete}>
                    <img className="DeleteAllImg" src="https://cdn2.iconfinder.com/data/icons/thin-line-color-1/21/33-512.png" alt="delete" />
                </button>
            </div>
            <footer className="Footer">
                <a className="AddFootballer" href="/footballers/add">Add Footballer</a>
            </footer>
        </div>
        
    );
}