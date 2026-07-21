import "./PropertyDetails.css";
import { useContext, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { HouseContext } from "../../context/HouseContext";

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { houses } = useContext(HouseContext);

  const house = houses.find(
    (item) => (item._id || item.id) === id
  );

  const [selectedImage, setSelectedImage] = useState(0);

  if (!house) {
    return (
      <section className="details-page">
        <h1>Property Not Found</h1>

        <button onClick={() => navigate(-1)}>
          ← Go Back
        </button>
      </section>
    );
  }

  return (
    <section className="details-page">

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="details-container">

        {/* Property Images */}
        <div className="image-gallery">

          <div className="gallery">
            <img
              src={house.images?.[selectedImage] || house.image}
              alt={house.title}
              className="gallery-image"
            />
          </div>

          {house.images && house.images.length > 1 && (
            <div className="thumbnail-container">

              {house.images.slice(0, 2).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${house.title} ${index + 1}`}
                  className={`thumbnail ${
                    selectedImage === index ? "active-thumbnail" : ""
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}

            </div>
          )}

        </div>

        {/* Property Details */}
        <div className="details-content">

          <span
            className={
              house.status === "Available"
                ? "status available"
                : "status occupied"
            }
          >
            {house.status}
          </span>

          <h1>{house.title}</h1>

          <p>
            <strong>Property Code:</strong> {house.code}
          </p>

          <p>
            <strong>County:</strong> {house.county}
          </p>

          <p>
            <strong>Location:</strong> {house.location}
          </p>

          <p>
            <strong>Sub-location:</strong> {house.sublocation}
          </p>

          <p>
            <strong>House Type:</strong> {house.type}
          </p>

          <p>
            <strong>Monthly Rent:</strong> KSh{" "}
            {Number(house.rent).toLocaleString()}
          </p>

          <p>
            <strong>Deposit:</strong> KSh{" "}
            {Number(house.deposit).toLocaleString()}
          </p>

          <p>
            <strong>Landlord:</strong> {house.landlord}
          </p>

          <p>
            <strong>Phone:</strong> {house.phone}
          </p>

          <h3>Amenities</h3>

          <div className="amenities">
            {house.amenities?.map((item, index) => (
              <span
                key={index}
                className="amenity"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="details-buttons">

            <a
              href={`tel:${house.phone}`}
              className="call-btn"
            >
              📞 Call
            </a>

            <a
              href={`https://wa.me/254${house.phone.substring(1)}`}
              target="_blank"
              rel="noreferrer"
              className="whatsapp-btn"
            >
              💬 WhatsApp
            </a>

            <a
              href={house.mapLink || "#"}
              target="_blank"
              rel="noreferrer"
              className="map-btn"
            >
              📍 View on Google Maps
            </a>

            <Link
              to="/viewing-request"
              state={{ property: house.title }}
            >
              <button className="view-btn">
                📅 Request Viewing
              </button>
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}

export default PropertyDetails;