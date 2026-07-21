import "./Landlord.css";
import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { HouseContext } from "../../context/HouseContext";


function Landlord() {
  const {
  houses,
  setHouses,
  addHouse,
  updateHouse,
  deleteHouse,
  viewingRequests,
  setViewingRequests,
  approveViewingRequest,
  declineViewingRequest,
} = useContext(HouseContext);


  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const [newHouse, setNewHouse] = useState({
  title: "",
  image: "",
  mapLink: "",
  county: "",
  location: "",
  sublocation: "",
  type: "",
  rent: "",
  deposit: "",
  landlord: "",
  phone: "",
  amenities: "",
  status: "Available",
});

useEffect(() => {
  const fetchViewingRequests = async () => {
    try {
      const response = await axios.get(
  `${import.meta.env.VITE_API_URL}/viewing-requests`
);

      setViewingRequests(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  fetchViewingRequests();
}, []);

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

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (editingId) {
  const propertyData = {
    ...newHouse,
    image: newHouse.image,
    images: [newHouse.image],
    mapLink: newHouse.mapLink,
    amenities: newHouse.amenities
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== ""),
  };

  const response = await axios.put(
    `${import.meta.env.VITE_API_URL}/houses/${editingId}`,
    propertyData
  );

  setHouses((prev) =>
    prev.map((house) =>
      house._id === editingId ? response.data : house
    )
  );

  toast.success("Property updated successfully! ✏️");

  setEditingId(null);

} else {
      const propertyData = {
  code: `NC${Date.now().toString().slice(-4)}`,
  title: newHouse.title,
  type: newHouse.type,
  county: newHouse.county,
  location: newHouse.location,
  sublocation: newHouse.sublocation,
  rent: Number(newHouse.rent),
  deposit: Number(newHouse.deposit),
  landlord: newHouse.landlord,
  phone: newHouse.phone,
  mapLink: newHouse.mapLink,
  status: newHouse.status,
  image: newHouse.image,
  images: [newHouse.image],
  amenities: newHouse.amenities
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item !== ""),
};
console.log(propertyData);

      const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/houses`,
  propertyData
);

      // Update React state with the saved house from MongoDB
      setHouses((prev) => [...prev, response.data]);

      toast.success("Property added successfully! 🏠");
    }

    // Reset form
    setNewHouse({
      title: "",
      image: "",
      mapLink: "",
      county: "",
      location: "",
      sublocation: "",
      type: "",
      rent: "",
      deposit: "",
      landlord: "",
      phone: "",
      amenities: "",
      status: "Available",
    });

  } catch (error) {
    console.error("Error saving property:", error);
    toast.error("Failed to save property. Please try again.");
  }
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

        <input
  type="url"
  name="mapLink"
  placeholder="Google Maps Link"
  value={newHouse.mapLink}
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

        <input
  type="text"
  name="amenities"
  placeholder="Amenities (e.g. Water, WiFi, Parking, CCTV)"
  value={newHouse.amenities}
  onChange={handleChange}
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
  src={house.images?.[0] || house.image}
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

        <p><strong>Status:</strong></p>

<select
  value={house.status}
  onChange={async (e) => {
    try {
      const response = await axios.put(
  `${import.meta.env.VITE_API_URL}/houses/${house._id}`,
  {
    ...house,
    status: e.target.value,
  }
);

      setHouses((prev) =>
        prev.map((h) =>
          h._id === house._id ? response.data : h
        )
      );

      toast.success("Status updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status.");
    }
  }}
>
  <option value="Available">Available</option>
  <option value="Occupied">Occupied</option>
</select>

        <div className="property-actions">

          <button
            className="view-btn"
            onClick={() => {
              setNewHouse({
  title: house.title,
  image: house.image || house.images?.[0] || "",
  mapLink: house.mapLink || "",
  county: house.county,
  location: house.location,
  sublocation: house.sublocation,
  type: house.type,
  rent: house.rent,
  deposit: house.deposit,
  landlord: house.landlord,
  phone: house.phone,
  amenities: house.amenities?.join(", ") || "",
  status: house.status,
});

              setEditingId(house._id);

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
            onClick={() => deleteHouse(house._id)}
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

  <div
    className="dashboard-card"
    key={request._id || request.id}
  >

              <h3>{request.name}</h3>

              <p><strong>Phone:</strong> {request.phone}</p>

              <p><strong>Property:</strong> {request.property}</p>

              <p><strong>Date:</strong> {request.date}</p>

              <p><strong>Status:</strong> {request.status}</p>

              <button
                className="whatsapp-btn"
                onClick={() => approveViewingRequest(request._id)}
              >
                ✅ Approve
              </button>

              <button
                className="favorite-btn"
                onClick={() => declineViewingRequest(request._id)}
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