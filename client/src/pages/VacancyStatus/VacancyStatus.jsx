import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { HouseContext } from "../../context/HouseContext";
import "./VacancyStatus.css";

function VacancyStatus() {

  const { houses } = useContext(HouseContext);
  const [filter, setFilter] = useState("All");


  const availableHouses = houses.filter(
    (house) => house.status === "Available"
  );


  const occupiedHouses = houses.filter(
    (house) => house.status === "Occupied"
  );

  const filteredHouses =
  filter === "All"
    ? houses
    : houses.filter((house) => house.status === filter);


  return (

    <section className="vacancy-page">

      <h1>
        House Vacancy Status
      </h1>

      <div className="vacancy-summary">

        <div className="filter-buttons">

  <button
    className={filter === "All" ? "active" : ""}
    onClick={() => setFilter("All")}
  >
    All Houses
  </button>

  <button
    className={filter === "Available" ? "active" : ""}
    onClick={() => setFilter("Available")}
  >
    Available
  </button>

  <button
    className={filter === "Occupied" ? "active" : ""}
    onClick={() => setFilter("Occupied")}
  >
    Occupied
  </button>

</div>

  <div className="summary-card">
    <h3>{houses.length}</h3>
    <p>Total Houses</p>
  </div>

  <div className="summary-card available-card">
    <h3>{availableHouses.length}</h3>
    <p>Available</p>
  </div>

  <div className="summary-card occupied-card">
    <h3>{occupiedHouses.length}</h3>
    <p>Occupied</p>
  </div>

</div>

<div className="vacancy-grid">

  {filteredHouses.map((house) => (

    <div
      className="vacancy-card"
      key={house._id || house.id}
    >

      <img
        src={house.images?.[0] || house.image}
        alt={house.title}
      />

      <h3>{house.title}</h3>

      <p>
        <strong>Location:</strong> {house.location}
      </p>

      <p>
        <strong>Sub-location:</strong> {house.sublocation}
      </p>

      <p>
        <strong>Type:</strong> {house.type}
      </p>

      <p>
        <strong>Rent:</strong> KSh {house.rent.toLocaleString()}
      </p>

      <p>
        <strong>Landlord:</strong> {house.landlord}
      </p>

      <p
        className={
          house.status === "Available"
            ? "available"
            : "occupied"
        }
      >
        Status: {house.status}
      </p>

      <Link to={`/property/${house._id || house.id}`}>
        <button className="details-btn">
          View Details
        </button>
      </Link>

    </div>

  ))}

</div>
    </section>

  );

}


export default VacancyStatus;