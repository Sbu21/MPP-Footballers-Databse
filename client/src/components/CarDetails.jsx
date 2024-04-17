import "../css/CarDetails.css";
import carService from "../utils/carService";
import { useParams, useNavigate} from 'react-router-dom';
import { useState, useEffect } from "react";
import useCarStore from "../utils/carStore";

export default function CarDetails({cars, removeCar}) {
    const { id } = useParams();
    const navigateTo = useNavigate();
    //const car = cars.find(car => car._id === id);
    const [car, setCar] = useState(undefined);
    //const car = useCarStore(state => state.cars.find(car => car._id === id));
    

    useEffect(() => {
        const fetchCar = async () => {
           const car = await carService.getCarById(id);
           setCar(car);
        }
        fetchCar();
    }, []);

    const remove = () => {
        removeCar(car._id);
        navigateTo('/cars');
    }

    return (
        <div className="CarDetails">
            {car === undefined ? <h1>The car you're looking for doesn't exist</h1> :
                <div className="Car">
                    <img src={car.image} alt="Car Image" />
                    <p>Manufacturer: {car.make}</p>
                    <p>Model: {car.model}</p>
                    <p>Year: {car.year}</p>
                    <p>Price: {car.price}€</p>
                    <span className="Buttons"><button className="Delete-Button" onClick={remove}>Delete</button> <button onClick={() => navigateTo(`/cars/edit/${car._id}`)} className="Edit-Button">Edit</button></span>
                </div>  
            }
            <a className="Back-Link" href="/cars">Go Back</a>
        </div>
    );
}