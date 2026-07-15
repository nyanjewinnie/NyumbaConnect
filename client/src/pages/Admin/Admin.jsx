import { useContext } from "react";
import { HouseContext } from "../../context/HouseContext";

function Admin() {
  const {
    houses,
    favorites,
    viewingRequests,
    notifications,
  } = useContext(HouseContext);

  const availableHouses = houses.filter(
    (house) => house.status === "Available"
  ).length;

  const occupiedHouses = houses.filter(
    (house) => house.status === "Occupied"
  ).length;

  const approvedRequests = viewingRequests.filter(
    (request) => request.status === "Approved"
  ).length;

  const pendingRequests = viewingRequests.filter(
    (request) => request.status === "Pending"
  ).length;

  const nairobiHouses = houses.filter(
    (house) => house.county === "Nairobi"
  ).length;

  const kiambuHouses = houses.filter(
    (house) => house.county === "Kiambu"
  ).length;

  return (
    <section className="dashboard">

      <h1>⚙️ Admin Dashboard</h1>

      <p>
        Welcome to the NyumbaConnect Administration Panel.
      </p>

      {/* ================= STATISTICS ================= */}

      <div className="dashboard-grid">

        <div className="dashboard-card total-card">
          <h2>🏠 Total Properties</h2>
          <h1>{houses.length}</h1>
        </div>

        <div className="dashboard-card available-card">
          <h2>✅ Available</h2>
          <h1>{availableHouses}</h1>
        </div>

        <div className="dashboard-card occupied-card">
          <h2>❌ Occupied</h2>
          <h1>{occupiedHouses}</h1>
        </div>

        <div className="dashboard-card nairobi-card">
          <h2>🏙 Nairobi</h2>
          <h1>{nairobiHouses}</h1>
        </div>

        <div className="dashboard-card kiambu-card">
          <h2>🌳 Kiambu</h2>
          <h1>{kiambuHouses}</h1>
        </div>

        <div className="dashboard-card favorites-card">
          <h2>❤️ Favorites</h2>
          <h1>{favorites.length}</h1>
        </div>

        <div className="dashboard-card viewing-card">
          <h2>📅 Viewing Requests</h2>
          <h1>{viewingRequests.length}</h1>
        </div>

        <div className="dashboard-card approved-card">
          <h2>✔ Approved</h2>
          <h1>{approvedRequests}</h1>
        </div>

        <div className="dashboard-card pending-card">
          <h2>⏳ Pending</h2>
          <h1>{pendingRequests}</h1>
        </div>

        <div className="dashboard-card notification-card">
          <h2>🔔 Notifications</h2>
          <h1>{notifications.length}</h1>
        </div>

      </div>

      <hr />

      {/* ================= PROPERTY TABLE ================= */}

      <h2>🏘 Recent Properties</h2>

      <table className="admin-table">

        <thead>

          <tr>
            <th>Code</th>
            <th>Title</th>
            <th>County</th>
            <th>Location</th>
            <th>Rent</th>
            <th>Status</th>
          </tr>

        </thead>

        <tbody>

          {houses.map((house) => (

            <tr key={house.id}>

              <td>{house.code}</td>

              <td>{house.title}</td>

              <td>{house.county}</td>

              <td>{house.location}</td>

              <td>
                KSh {Number(house.rent).toLocaleString()}
              </td>

              <td>

                <span
                  className={
                    house.status === "Available"
                      ? "status available"
                      : "status occupied"
                  }
                >
                  {house.status}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      <hr />

      {/* ================= VIEWING REQUESTS ================= */}

      <h2>📅 Recent Viewing Requests</h2>

      {viewingRequests.length === 0 ? (

        <p>No viewing requests have been submitted yet.</p>

      ) : (

        <table className="admin-table">

          <thead>

            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Status</th>
            </tr>

          </thead>

          <tbody>

            {viewingRequests.map((request) => (

              <tr key={request.id}>

                <td>{request.name}</td>

                <td>{request.phone}</td>

                <td>{request.date}</td>

                <td>

                  <span
                    className={
                      request.status === "Approved"
                        ? "status available"
                        : request.status === "Declined"
                        ? "status occupied"
                        : "status pending"
                    }
                  >
                    {request.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </section>
  );
}

export default Admin;