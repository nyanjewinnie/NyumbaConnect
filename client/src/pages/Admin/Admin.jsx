import "./Admin.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { HouseContext } from "../../context/HouseContext";

function Admin() {
  const {
    houses,
    favorites,
    viewingRequests,
    notifications,
  } = useContext(HouseContext);

  const [users, setUsers] = useState([]);

  useEffect(() => {
  fetchUsers();
}, []);

const fetchUsers = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/users`
    );

    setUsers(response.data);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const updateStatus = async (id, status) => {
  try {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/viewing-requests/${id}`,
      {
        status,
      }
    );

    // Refresh the viewing requests
    window.location.reload();

  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmDelete) return;

  try {

    await axios.delete(
      `${import.meta.env.VITE_API_URL}/users/${id}`
    );

    alert("User deleted successfully.");

    fetchUsers();

  } catch (error) {
    console.error(error);
    alert("Failed to delete user.");
  }

};

const deleteHouse = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this property?"
  );

  if (!confirmDelete) return;

  try {

    await axios.delete(
      `${import.meta.env.VITE_API_URL}/houses/${id}`
    );

    alert("Property deleted successfully.");

    // Refresh the page
    window.location.reload();

  } catch (error) {
    console.error(error);
    alert("Failed to delete property.");
  }

};

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

        <div className="dashboard-card total-card">
  <h2>👥 Total Users</h2>
  <h1>{users.length}</h1>
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
  <th>Action</th>
</tr>

        </thead>

        <tbody>

          {houses.map((house) => (

            <tr key={house._id || house.id}>

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

              <td>
  <button
    className="delete-btn"
    onClick={() => deleteHouse(house._id)}
  >
    Delete
  </button>
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
  <th>Action</th>
</tr>

          </thead>

          <tbody>

            {viewingRequests.map((request) => (

              <tr key={request._id || request.id}>

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

                <td>
  <div className="action-buttons">

    <button
      className="approve-btn"
      onClick={() => updateStatus(request._id, "Approved")}
    >
      Approve
    </button>

    <button
      className="decline-btn"
      onClick={() => updateStatus(request._id, "Declined")}
    >
      Decline
    </button>

  </div>
</td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

      <hr />

<h2>👥 Registered Users</h2>

{users.length === 0 ? (

  <p>No users found.</p>

) : (

  <table className="admin-table">

    <thead>
      <tr>
  <th>Full Name</th>
  <th>Email</th>
  <th>Phone</th>
  <th>Role</th>
  <th>Action</th>
</tr>
    </thead>

    <tbody>

      {users.map((user) => (

        <tr key={user._id}>

  <td>{user.fullName}</td>

  <td>{user.email}</td>

  <td>{user.phone}</td>

  <td>{user.role}</td>

  <td>
  {user.role !== "Admin" ? (
    <button
      className="delete-btn"
      onClick={() => deleteUser(user._id)}
    >
      Delete
    </button>
  ) : (
    <span style={{ color: "green", fontWeight: "bold" }}>
      Protected
    </span>
  )}
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