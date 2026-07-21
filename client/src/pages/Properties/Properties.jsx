import "./Properties.css";
import { useContext, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HouseContext } from "../../context/HouseContext";

function Properties() {
  const { houses, favorites, setFavorites } = useContext(HouseContext);

  const navigate = useNavigate();

  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [county, setCounty] = useState("All");
  const [sortBy, setSortBy] = useState("Default");

  const filteredHouses = useMemo(() => {
    let results = [...houses];

    if (category !== "All") {
      results = results.filter(
        (house) => house.type === category
      );
    }

    if (county !== "All") {
      results = results.filter(
        (house) => house.county === county
      );
    }

    if (search !== "") {
      results = results.filter((house) =>
        house.location
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    switch (sortBy) {
      case "Lowest Rent":
        results.sort((a, b) => a.rent - b.rent);
        break;

      case "Highest Rent":
        results.sort((a, b) => b.rent - a.rent);
        break;

      case "Available First":
        results.sort((a) =>
          a.status === "Available" ? -1 : 1
        );
        break;

      default:
        break;
    }

    return results;
  }, [houses, category, county, search, sortBy]);

const addToFavorites = (house) => {
  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  if (!isLoggedIn) {
    toast.info(
      "Please login or create an account to save favorite properties."
    );

    navigate("/login");
    return;
  }

  const exists = favorites.find(
    (item) => item._id === house._id
  );

  if (exists) {
    toast.info("House is already in your favorites ❤️");
    return;
  }

  setFavorites([...favorites, house]);
  toast.success("House added to favorites ❤️");
};

  return (
    <section className="properties-page">

      <h1>Browse Properties</h1>

      <p className="section-description">
        Browse verified rental houses across Nairobi and Kiambu County.
      </p>

      {/* Category Filter */}

      <div className="category-filter">

        {[
          "All",
          "Single Room",
          "Bedsitter",
          "One Bedroom",
          "Two Bedroom",
          "Three Bedroom",
          "Family House",
          "Maisonette",
          "Apartment",
        ].map((item) => (
          <button
            key={item}
            className={
              category === item ? "active-category" : ""
            }
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}

      </div>

      {/* Toolbar */}

      <div className="property-toolbar">

        <input
          type="text"
          placeholder="🔍 Search by location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={county}
          onChange={(e) => setCounty(e.target.value)}
        >
          <option>All</option>
          <option>Kiambu</option>
          <option>Nairobi</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option>Default</option>
          <option>Lowest Rent</option>
          <option>Highest Rent</option>
          <option>Available First</option>
        </select>

      </div>

      {/* Summary */}

      <div className="property-summary">

        <h3>{filteredHouses.length} Properties Found</h3>

        <p>
          🟢{" "}
          {
            filteredHouses.filter(
              (house) => house.status === "Available"
            ).length
          }{" "}
          Available
        </p>

        <p>
          🔴{" "}
          {
            filteredHouses.filter(
              (house) => house.status === "Occupied"
            ).length
          }{" "}
          Occupied
        </p>

      </div>

      {/* Properties */}

      <div className="property-grid">

        {filteredHouses.length === 0 ? (

          <div className="no-results">

            <h2>No Properties Found 😔</h2>

            <p>
              Try changing your search filters.
            </p>

          </div>

        ) : (

          filteredHouses.map((house) => (

            <div
  className="property-card"
  key={house._id}
>

              <div className="status-badge">
                {house.status}
              </div>

            <img
  src={house.images?.[0] || house.image}
  alt={house.title}
  className="property-image"
/>

              <div className="property-info">

                <small>
                  {house.code} • {house.county}
                </small>

                <h2>{house.title}</h2>

                <p>
                  📍 {house.location}
                </p>

                <p>
                  <strong>Category:</strong>{" "}
                  {house.type}
                </p>

                <p>
                  <strong>Monthly Rent:</strong> KSh{" "}
                  {house.rent.toLocaleString()} / month
                </p>

                <p>
                  <strong>Deposit:</strong> KSh{" "}
                  {house.deposit.toLocaleString()}
                </p>

                <h4>Amenities</h4>

                <div className="amenities">

                  {house.amenities.map(
                    (item, index) => (
                      <span key={index}>
                        {item}
                      </span>
                    )
                  )}

                </div>

                <div className="property-actions">

                  <a
                    href={`tel:${house.phone}`}
                    className="call-btn"
                  >
                    📞 Call
                  </a>

                  <a
                    href={`https://wa.me/254${house.phone.substring(
                      1
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="whatsapp-btn"
                  >
                    💬 WhatsApp
                  </a>

                  <button
                    className="favorite-btn"
                    onClick={() =>
                      addToFavorites(house)
                    }
                  >
                    ❤️ Favorite
                  </button>

                </div>

                <div className="property-actions">

  <button
    className="view-btn"
    onClick={() => {
      const isLoggedIn =
        localStorage.getItem("isLoggedIn") === "true";

      if (!isLoggedIn) {
        toast.info(
          "Please login or create an account to request a property viewing."
        );

        navigate("/login");
        return;
      }

      navigate("/viewing-request", {
        state: {
          property: house.title,
        },
      });
    }}
  >
    📅 Request Viewing
  </button>

  <Link to={`/property/${house._id}`}>
    <button className="email-btn">
      👁 View Details
    </button>
  </Link>

</div>

              </div>

            </div>

          ))

        )}

      </div>

    </section>
  );
}

export default Properties;