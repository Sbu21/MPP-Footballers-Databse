import "../css/CarDetails.css";
import { useParams, useNavigate} from 'react-router-dom';

export default function CarDetails({cars, removeCar}) {
    const { id } = useParams();
    const navigateTo = useNavigate();
    const car = cars.find(car => car.id === id);

    const remove = () => {
        removeCar(car.id);
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
                    <p>Price: {car.price.toString()}€</p>
                    <span className="Buttons"><button className="Delete-Button" onClick={remove}>Delete</button> <button onClick={() => navigateTo(`/cars/edit/${car.id}`)} className="Edit-Button">Edit</button></span>
                </div> 
                
            }
            <a className="Back-Link" href="/cars">Go Back</a>
        </div>
    );
}