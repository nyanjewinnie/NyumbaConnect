import { useContext } from "react";
import { Link } from "react-router-dom";
import { HouseContext } from "../../context/HouseContext";
import "./Tenant.css";

function Tenant() {
  const {
    favorites,
    viewingRequests,
    notifications,
  } = useContext(HouseContext);

  return (
    <section className="dashboard">

      <h1>👤 Tenant Dashboard</h1>

      <p>Welcome to your personal dashboard.</p>

      {/* Summary Cards */}

      <div className="dashboard-grid">

        <div className="dashboard-card total-card">
  <h2>❤️ Favorites</h2>
          <h1>{favorites.length}</h1>
        </div>

        <div className="dashboard-card available-card">
  <h2>📅 Viewing Requests</h2>
          <h1>{viewingRequests.length}</h1>
        </div>

        <div className="dashboard-card occupied-card">
  <h2>🔔 Notifications</h2>
          <h1>{notifications.length}</h1>
        </div>

      </div>

      <hr />

      {/* Favorite Houses */}

      <h2>My Favorite Houses</h2>

      {favorites.length === 0 ? (

        <p>You have not added any favorite houses.</p>

      ) : (

        <div className="dashboard-grid">

          {favorites.map((house) => (

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
                <strong>Location:</strong> {house.location}
              </p>

              <p>
                <strong>Monthly Rent:</strong> KSh{" "}
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

              <Link to={`/property/${house._id || house.id}`}>
                <button className="view-btn">
                  View Details
                </button>
              </Link>

            </div>

          ))}

        </div>

      )}

      <hr />

      {/* Viewing Requests */}

      <h2>
        Viewing Request History ({viewingRequests.length})
      </h2>

      {viewingRequests.length === 0 ? (

        <p>No viewing requests submitted yet.</p>

      ) : (

        <div className="dashboard-grid">

          {viewingRequests.map((request) => (

            <div
              className="dashboard-card"
              key={request._id || request.id}
            >

              <h3>{request.property}</h3>

              <p>
                <strong>Name:</strong> {request.name}
              </p>

              <p>
                <strong>Phone:</strong> {request.phone}
              </p>

              <p>
                <strong>Date:</strong> {request.date}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    color:
                      request.status === "Approved"
                        ? "green"
                        : request.status === "Declined"
                        ? "red"
                        : "orange",
                    fontWeight: "bold",
                  }}
                >
                  {request.status}
                </span>
              </p>

            </div>

          ))}

        </div>

      )}

      {/* Upcoming Viewings */}

      {viewingRequests.some(
        (request) => request.status === "Approved"
      ) && (
        <>
          <hr />

          <h2>Upcoming Viewings</h2>

          <div className="dashboard-grid">

            {viewingRequests
              .filter(
                (request) =>
                  request.status === "Approved"
              )
              .map((request) => (

                <div
                  className="dashboard-card"
                  key={request._id || request.id}
                >

                  <h3>{request.property}</h3>

                  <p>
                    <strong>Date:</strong> {request.date}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      style={{
                        color: "green",
                        fontWeight: "bold",
                      }}
                    >
                      Approved
                    </span>
                  </p>

                  <p>
                    Please arrive on time for your scheduled
                    house viewing.
                  </p>

                </div>

              ))}

          </div>
        </>
      )}

      <hr />

      {/* Notifications */}

      <h2>Notifications</h2>

      {notifications.length === 0 ? (

        <p>No notifications available.</p>

      ) : (

        <div className="dashboard-grid">

          {notifications.map((note, index) => (

            <div
              className="dashboard-card"
              key={index}
            >

              <h3>🔔 Notification</h3>

              <p
                style={{
                  color: "#2563eb",
                  fontWeight: "500",
                }}
              >
                {note}
              </p>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default Tenant;