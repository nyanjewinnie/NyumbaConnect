import "./Landlord.css";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { HouseContext } from "../../context/HouseContext";

function Landlord() {
  const {
    houses,
    addHouse,
    updateHouse,
    deleteHouse,
    viewingRequests,
    approveViewingRequest,
    declineViewingRequest,
  } = useContext(HouseContext);


  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [newHouse, setNewHouse] = useState({
    title: "",
    image: "",
    county: "",
    location: "",
    sublocation: "",
    type: "",
    rent: "",
    deposit: "",
    landlord: "",
    phone: "",
    status: "Available",
  });

  const locations = {
    Nairobi: [
      "Kasarani",
      "Embakasi",
      "Westlands",
      "South C",
      "Kilimani",
    ],

    Kiambu: [
      "Ruiru",
      "Kiambu Town",
      "Githurai",
      "Juja",
    ],
  };

  const sublocations = {
    Ruiru: ["Mwihoko", "Membley"],
    "Kiambu Town": ["Kiambu Central"],
    Githurai: ["Githurai 45"],
    Juja: ["Juja Farm"],
    Kasarani: ["Mwiki"],
    Embakasi: ["Imara Daima"],
    Westlands: ["Westlands Central"],
    "South C": ["South C Estate"],
    Kilimani: ["Kilimani Estate"],
  };

  const handleChange = (e) => {
    setNewHouse({
      ...newHouse,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      updateHouse({
        id: editingId,
        ...newHouse,
      });

      toast.success("Property updated successfully! ✏️");
      setEditingId(null);

    } else {
      addHouse(newHouse);

      toast.success("Property added successfully! 🏠");
    }

    setNewHouse({
      title: "",
      image: "",
      county: "",
      location: "",
      sublocation: "",
      type: "",
      rent: "",
      deposit: "",
      landlord: "",
      phone: "",
      status: "Available",
    });
  };

  const filteredHouses = houses.filter((house) =>
  house.title.toLowerCase().includes(search.toLowerCase()) ||
  house.location.toLowerCase().includes(search.toLowerCase()) ||
  house.type.toLowerCase().includes(search.toLowerCase())
);
const totalProperties = houses.length;

const availableProperties = houses.filter(
  (house) => house.status === "Available"
).length;

const occupiedProperties = houses.filter(
  (house) => house.status === "Occupied"
).length;

  return (
    <section className="dashboard">

      <h1>🏠 Landlord Dashboard</h1>
      <div className="dashboard-summary">

  <div className="summary-card">
    <h3>🏠 Total Properties</h3>
    <p>{totalProperties}</p>
  </div>

  <div className="summary-card">
    <h3>✅ Available</h3>
    <p>{availableProperties}</p>
  </div>

  <div className="summary-card">
    <h3>❌ Occupied</h3>
    <p>{occupiedProperties}</p>
  </div>

</div>

      <h2>
        {editingId ? "Edit Property" : "Add New Property"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="viewing-form"
      >

        <input
          type="text"
          name="title"
          placeholder="Property Title"
          value={newHouse.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={newHouse.image}
          onChange={handleChange}
          required
        />

        <select
          name="county"
          value={newHouse.county}
          onChange={handleChange}
          required
        >
          <option value="">Select County</option>
          <option value="Nairobi">Nairobi</option>
          <option value="Kiambu">Kiambu</option>
        </select>

                <select
          name="type"
          value={newHouse.type}
          onChange={handleChange}
          required
        >
          <option value="">Select House Type</option>
          <option value="Single Room">Single Room</option>
          <option value="Bedsitter">Bedsitter</option>
          <option value="Studio Apartment">Studio Apartment</option>
          <option value="One Bedroom">One Bedroom</option>
          <option value="Two Bedroom">Two Bedroom</option>
          <option value="Three Bedroom">Three Bedroom</option>
          <option value="Apartment">Apartment</option>
          <option value="Maisonette">Maisonette</option>
          <option value="Family House">Family House</option>
        </select>

        <select
          name="location"
          value={newHouse.location}
          onChange={handleChange}
          required
        >
          <option value="">Select Location</option>

          {newHouse.county &&
            locations[newHouse.county].map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
        </select>

        <select
          name="sublocation"
          value={newHouse.sublocation}
          onChange={handleChange}
          required
        >
          <option value="">Select Sub-location</option>

          {newHouse.location &&
            sublocations[newHouse.location]?.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
        </select>

        <input
          type="number"
          name="rent"
          placeholder="Monthly Rent"
          value={newHouse.rent}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="deposit"
          placeholder="Deposit"
          value={newHouse.deposit}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="landlord"
          placeholder="Landlord Name"
          value={newHouse.landlord}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={newHouse.phone}
          onChange={handleChange}
          required
        />

        <div className="form-actions">

  <button type="submit">
    {editingId ? "💾 Save Changes" : "➕ Add Property"}
  </button>

  {editingId && (
    <button
      type="button"
      className="favorite-btn"
      onClick={() => {
        setEditingId(null);

        setNewHouse({
          title: "",
          image: "",
          county: "",
          location: "",
          sublocation: "",
          type: "",
          rent: "",
          deposit: "",
          landlord: "",
          phone: "",
          status: "Available",
        });

        toast.info("Edit cancelled.");
      }}
    >
      ❌ Cancel
    </button>
  )}

</div>

      </form>

      <hr />

      <h2>
  My Properties ({filteredHouses.length})
</h2>

<input
  type="text"
  placeholder="🔍 Search your properties..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="search-input"
/>

      <div className="dashboard-grid">

  {filteredHouses.length === 0 ? (

    <div className="empty-state">
      <h3>🏠 No properties found</h3>
      <p>
  No properties match your search. Try another keyword or add a new property.
</p>
    </div>

  ) : (

    filteredHouses.map((house) => (

      <div className="dashboard-card" key={house.id}>

        <img
          src={house.image}
          alt={house.title}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
          }}
        />

        <h3>{house.title}</h3>

        <p><strong>Type:</strong> {house.type}</p>

        <p><strong>County:</strong> {house.county}</p>

        <p><strong>Location:</strong> {house.location}</p>

        <p><strong>Sub-location:</strong> {house.sublocation}</p>

        <p>
          <strong>Rent:</strong> KSh{" "}
          {Number(house.rent).toLocaleString()}
        </p>

        <p><strong>Status:</strong> {house.status}</p>

        <div className="property-actions">

          <button
            className="view-btn"
            onClick={() => {
              setNewHouse({
                title: house.title,
                image: house.image,
                county: house.county,
                location: house.location,
                sublocation: house.sublocation,
                type: house.type,
                rent: house.rent,
                deposit: house.deposit,
                landlord: house.landlord,
                phone: house.phone,
                status: house.status,
              });

              setEditingId(house.id);

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            ✏️ Edit
          </button>

          <button
            className="favorite-btn"
            onClick={() => deleteHouse(house.id)}
          >
            🗑 Delete
          </button>

        </div>

      </div>

    ))

  )}





      </div>

      <hr />

      <h2>Viewing Requests</h2>

      {viewingRequests.length === 0 ? (

        <p>No viewing requests yet.</p>

      ) : (

        <div className="dashboard-grid">

          {viewingRequests.map((request) => (

            <div className="dashboard-card" key={request.id}>

              <h3>{request.name}</h3>

              <p><strong>Phone:</strong> {request.phone}</p>

              <p><strong>Property:</strong> {request.property}</p>

              <p><strong>Date:</strong> {request.date}</p>

              <p><strong>Status:</strong> {request.status}</p>

              <button
                className="whatsapp-btn"
                onClick={() => approveViewingRequest(request.id)}
              >
                ✅ Approve
              </button>

              <button
                className="favorite-btn"
                onClick={() => declineViewingRequest(request.id)}
              >
                ❌ Decline
              </button>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default Landlord;