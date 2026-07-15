import "./ViewingRequest.css";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { HouseContext } from "../../context/HouseContext";

function ViewingRequest() {
  const { houses, addViewingRequest } = useContext(HouseContext);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    property: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addViewingRequest({
      id: Date.now(),
      ...formData,
      status: "Pending",
    });

    toast.success("Viewing request submitted successfully! 🎉");

    setFormData({
      name: "",
      phone: "",
      property: "",
      date: "",
    });
  };

  return (
    <section className="viewing-page">

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
          <option value="">
            Select Property
          </option>

          {houses.map((house) => (
            <option
              key={house.id}
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