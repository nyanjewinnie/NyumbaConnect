import { useContext } from "react";
import { HouseContext } from "../../context/HouseContext";
import "./VacancyStatus.css";

function VacancyStatus() {

  const { houses } = useContext(HouseContext);


  const availableHouses = houses.filter(
    (house) => house.status === "Available"
  );


  const occupiedHouses = houses.filter(
    (house) => house.status === "Occupied"
  );


  return (

    <section className="vacancy-page">

      <h1>
        House Vacancy Status
      </h1>


      {/* Available Houses */}

      <h2 className="available-title">
        🟢 Available Houses
      </h2>


      <div className="vacancy-grid">


        {availableHouses.map((house)=>(


          <div 
            className="vacancy-card"
            key={house.id}
          >


            <img
              src={house.image}
              alt={house.type}
            />


            <h3>
              {house.type}
            </h3>


            <p>
              <strong>Location:</strong> {house.location}
            </p>


            <p>
              <strong>Rent:</strong> {house.rent}
            </p>


            <p>
              <strong>Landlord:</strong> {house.landlord}
            </p>


            <p className="available">
              Status: {house.status}
            </p>


          </div>


        ))}


      </div>




      {/* Occupied Houses */}


      <h2 className="occupied-title">
        🔴 Occupied Houses
      </h2>



      <div className="vacancy-grid">


        {occupiedHouses.map((house)=>(


          <div 
            className="vacancy-card"
            key={house.id}
          >


            <img
              src={house.image}
              alt={house.type}
            />


            <h3>
              {house.type}
            </h3>


            <p>
              <strong>Location:</strong> {house.location}
            </p>


            <p>
              <strong>Rent:</strong> {house.rent}
            </p>


            <p>
              <strong>Landlord:</strong> {house.landlord}
            </p>


            <p className="occupied">
              Status: {house.status}
            </p>


          </div>


        ))}


      </div>


    </section>

  );

}


export default VacancyStatus;