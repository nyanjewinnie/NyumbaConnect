import "./PropertyDetails.css";
import { useContext } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { HouseContext } from "../../context/HouseContext";

function PropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { houses } = useContext(HouseContext);

  const house = houses.find(
    (item) => item.id === Number(id)
  );

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

        <div className="image-gallery">

  <img
    src={house.image}
    alt={house.title}
    className="details-image"
  />

  {house.images && (
    <div className="thumbnail-container">

      {house.images.map((img,index)=>(

        <img
          key={index}
          src={img}
          alt={`${house.title} ${index}`}
          className="thumbnail"
        />

      ))}

    </div>
  )}

</div>

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
            {house.rent.toLocaleString()}
          </p>

          <p>
            <strong>Deposit:</strong> KSh{" "}
            {house.deposit.toLocaleString()}
          </p>

          <p>
            <strong>Landlord:</strong> {house.landlord}
          </p>

          <p>
            <strong>Phone:</strong> {house.phone}
          </p>

          <h3>Amenities</h3>

          <div className="amenities-list">

            {house.amenities.map((item, index) => (
              <span key={index}>
                {item}
              </span>
            ))}

          </div>

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
               href={house.mapLink}
               target="_blank"
               rel="noreferrer"
               className="map-btn"
            >
               📍 View on Google Maps
            </a>

            <Link to="/viewing-request">
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