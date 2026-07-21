import { useContext } from "react";
import { HouseContext } from "../../context/HouseContext";

function Favorites() {
  const { favorites } = useContext(HouseContext);

  return (
    <section className="page">

      <h1>My Favorite Houses ❤️</h1>

      <p>
        Houses you have saved for future viewing will appear here.
      </p>

      {favorites.length === 0 ? (

        <p>No favorite houses yet.</p>

      ) : (

        <div className="property-grid">

          {favorites.map((house) => (

            <div className="property-card" key={house._id || house.id}>

            <img
  src={house.images?.[0] || house.image}
  alt={house.title}
  style={{
    width: "100%",
    height: "220px",
    objectFit: "cover",
  }}
/>

              <div className="property-info">

                <h3>{house.title}</h3>

                <p>
                  <strong>Location:</strong> {house.location}
                </p>

                <p>
  <strong>Rent:</strong> KES {house.rent}
</p>

                <button>Remove ❤️</button>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default Favorites;