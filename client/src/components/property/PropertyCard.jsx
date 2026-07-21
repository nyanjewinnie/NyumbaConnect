function PropertyCard({ house }) {
  return (
    <div className="property-card">

      <img
        src={house.images?.[0] || house.image}
        alt={house.title}
        className="property-image"
      />

      <div className="property-content">

        <p className="property-code">
          {house.code} • {house.county}
        </p>

        <h2>{house.title}</h2>

        <p>📍 {house.location}</p>

        <p>
          <strong>Category:</strong> {house.type}
        </p>

        <p>
          <strong>Monthly Rent:</strong> KSh {house.rent} / month
        </p>

        <p>
          <strong>Deposit:</strong> KSh {house.deposit}
        </p>

        <p>
          <strong>Amenities:</strong>{" "}
          {house.amenities?.join(", ") || "None"}
        </p>

        <button>
          📞 Call
        </button>

        <button>
          💬 WhatsApp
        </button>

      </div>

    </div>
  );
}

export default PropertyCard;