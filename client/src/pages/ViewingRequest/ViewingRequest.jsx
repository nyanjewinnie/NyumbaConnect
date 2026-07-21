import "./ViewingRequest.css";
import { useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import { HouseContext } from "../../context/HouseContext";

function ViewingRequest() {
  const { houses, addViewingRequest } = useContext(HouseContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn !== "true") {
    toast.info("Please login to request a viewing first 🔐");

    navigate("/login");
  }
}, [navigate]);

  // Property passed from PropertyDetails
  const selectedProperty = location.state?.property || "";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    property: selectedProperty,
    date: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));

const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/viewing-requests`,
  {
    ...formData,
    tenant: user._id,
    status: "Pending",
  }
);

      addViewingRequest(response.data);

      toast.success("Viewing request submitted successfully! 🎉");

      setFormData({
        name: "",
        phone: "",
        property: selectedProperty,
        date: "",
      });

      setTimeout(() => {
        navigate(-1);
      }, 1500);

    } catch (error) {
      console.error(error);
      toast.error("Failed to submit viewing request.");
    }
  };

  return (
    <section className="viewing-page">

      <div className="back-container">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft /> Back
        </button>
      </div>

      <h1>Request a House Viewing</h1>

      <p>
        Fill in the form below and schedule a house viewing.
      </p>

      <form
        className="viewing-form"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <select
          name="property"
          value={formData.property}
          onChange={handleChange}
          required
        >
          <option value="">Select Property</option>

          {houses.map((house) => (
            <option
              key={house._id || house.id}
              value={house.title}
            >
              {house.title}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Submit Viewing Request
        </button>

      </form>

    </section>
  );
}

export default ViewingRequest;