export default function FootballerItem({footballer}) {

    return (
        <div className="FootballerItem">
            <p>Name: {footballer.name}</p>
            <p>Age: {footballer.age}</p>
            <p>Position: {footballer.position}</p>
            <p>Number of Seasons played: {footballer.footballerStats.length}</p>
        </div>
    );

}