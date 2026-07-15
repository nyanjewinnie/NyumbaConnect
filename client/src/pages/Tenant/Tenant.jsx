import { useContext } from "react";
import { HouseContext } from "../../context/HouseContext";

function Tenant() {
  const {
    favorites,
    viewingRequests,
    notifications,
  } = useContext(HouseContext);

  return (
    <section className="dashboard">

      <h1>👤 Tenant Dashboard</h1>

      <p>
        Welcome to your personal dashboard.
      </p>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h2>❤️ Favorites</h2>
          <h1>{favorites.length}</h1>
        </div>

        <div className="dashboard-card">
          <h2>📅 Viewing Requests</h2>
          <h1>{viewingRequests.length}</h1>
        </div>

        <div className="dashboard-card">
          <h2>🔔 Notifications</h2>
          <h1>{notifications.length}</h1>
        </div>

      </div>

      <hr />

      <h2>My Favorite Houses</h2>

      {favorites.length === 0 ? (

        <p>You have not added any favorite houses.</p>

      ) : (

        <div className="dashboard-grid">

          {favorites.map((house) => (

            <div className="dashboard-card" key={house.id}>

              <img
                src={house.image}
                alt={house.type}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                }}
              />

              <h3>{house.type}</h3>

              <p><strong>Location:</strong> {house.location}</p>

              <p><strong>Rent:</strong> {house.rent}</p>

              <p><strong>Status:</strong> {house.status}</p>

            </div>

          ))}

        </div>

      )}

      <hr />

      <h2>Viewing Request History</h2>

      {viewingRequests.length === 0 ? (

        <p>No viewing requests submitted yet.</p>

      ) : (

        <div className="dashboard-grid">

          {viewingRequests.map((request) => (

            <div className="dashboard-card" key={request.id}>

              <h3>{request.name}</h3>

              <p><strong>Property:</strong> {request.property}</p>

              <p><strong>Date:</strong> {request.date}</p>

              <p><strong>Phone:</strong> {request.phone}</p>

              <p><strong>Status:</strong> {request.status}</p>

            </div>

          ))}

        </div>

      )}

      <hr />

      <h2>Notifications</h2>

      {notifications.length === 0 ? (

        <p>No notifications available.</p>

      ) : (

        <div className="dashboard-grid">

  {notifications.map((note, index) => (

    <div className="dashboard-card" key={index}>

      <h3>🔔 Notification</h3>

      <p>{note}</p>

    </div>

  ))}

</div>

      )}

    </section>
  );
}

export default Tenant;