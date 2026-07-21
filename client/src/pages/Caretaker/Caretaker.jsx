import { useContext } from "react";
import { HouseContext } from "../../context/HouseContext";

function Caretaker() {
  const { houses, updateHouseStatus } = useContext(HouseContext);

  return (
    <section className="dashboard">
      <h1>🔑 Caretaker Dashboard</h1>

      <p>Manage house occupancy and vacancy status.</p>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Total Assigned Houses</h2>
          <h1>{houses.length}</h1>
        </div>

        <div className="dashboard-card">
          <h2>Available Houses</h2>
          <h1>
            {houses.filter(
              (house) => house.status === "Available"
            ).length}
          </h1>
        </div>

        <div className="dashboard-card">
          <h2>Occupied Houses</h2>
          <h1>
            {houses.filter(
              (house) => house.status === "Occupied"
            ).length}
          </h1>
        </div>
      </div>

      <hr />

      <h2>Assigned Properties</h2>

      <div className="dashboard-grid">
        {houses.map((house) => (
          <div
            className="dashboard-card"
            key={house._id || house.id}
          >
            <img
              src={house.images?.[0] || house.image}
              alt={house.title}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
              }}
            />

            <h3>{house.title}</h3>

            <p>
              <strong>Code:</strong> {house.code}
            </p>

            <p>
              <strong>Location:</strong> {house.location}
            </p>

            <p>
              <strong>Rent:</strong> KSh{" "}
              {Number(house.rent).toLocaleString()}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  color:
                    house.status === "Available"
                      ? "green"
                      : "red",
                  fontWeight: "bold",
                }}
              >
                {house.status}
              </span>
            </p>

            <button
              className="view-btn"
              onClick={() => updateHouseStatus(house)}
            >
              {house.status === "Available"
                ? "Mark as Occupied"
                : "Mark as Available"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Caretaker;