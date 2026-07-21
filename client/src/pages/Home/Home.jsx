import "./Home.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HouseContext } from "../../context/HouseContext";

function Home() {
  const { houses } = useContext(HouseContext);

  const heroImages = [
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1600&q=80",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <>
      {/* Project Banner */}
      <section className="project-banner">
        <h2>AN INTEGRATED HOUSE HUNTING WEBSITE</h2>
      </section>

      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.55)), url(${heroImages[currentImage]})`,
        }}
      >
        <div className="hero-content">
          <h1>
            Find Your Perfect Home with
            <span> NyumbaConnect</span>
          </h1>

          <p>
            Search verified rental houses across Nairobi and Kiambu County.
            Compare properties, contact landlords instantly, save your
            favourites and book property viewings—all in one place.
          </p>

          <div className="hero-buttons">
            <button onClick={() => (window.location.href = "/search")}>
              🔍 Search Houses
            </button>

            <button
              className="secondary"
              onClick={() => (window.location.href = "/properties")}
            >
              🏠 Browse Properties
            </button>
          </div>
        </div>
      </section>

      {/* Quick Search */}
      <section className="search-section">
        <h2>Quick House Search</h2>

        <div className="search-grid">
          <select>
            <option>Select Zone</option>
            <option>Nairobi</option>
            <option>Kiambu</option>
          </select>

          <select>
            <option>Select Location</option>
            <option>Ruiru</option>
            <option>Kiambu Town</option>
            <option>Thika</option>
            <option>Kasarani</option>
          </select>

          <select>
            <option>Select Sub-location</option>
            <option>Mwihoko</option>
            <option>Membley</option>
            <option>Githurai 45</option>
            <option>Roysambu</option>
          </select>

          <select>
            <option>Select House Type</option>
            <option>Single Room</option>
            <option>Bedsitter</option>
            <option>One Bedroom</option>
            <option>Two Bedroom</option>
            <option>Three Bedroom</option>
            <option>Apartment</option>
            <option>Maisonette</option>
          </select>

          <select>
            <option>Select Budget</option>
            <option>3,000 - 8,000</option>
            <option>8,000 - 15,000</option>
            <option>15,000 - 30,000</option>
            <option>30,000 - 50,000</option>
            <option>50,000+</option>
          </select>

          <button>Search Houses</button>
        </div>
      </section>

      {/* Statistics */}
      <section className="stats">
        <div className="stat-card">
          <h2>{houses.length}</h2>
          <p>Listed Houses</p>
        </div>

        <div className="stat-card">
          <h2>
            {houses.filter((house) => house.status === "Available").length}
          </h2>
          <p>Available Houses</p>
        </div>

        <div className="stat-card">
          <h2>{[...new Set(houses.map((house) => house.county))].length}</h2>
          <p>Counties Covered</p>
        </div>

        <div className="stat-card">
          <h2>{[...new Set(houses.map((house) => house.type))].length}</h2>
          <p>House Types</p>
        </div>
      </section>

      {/* Featured Houses */}
      <section className="featured-properties">
        <h2>Featured Properties</h2>

        <p className="section-description">
          Browse some of our latest available rental houses.
        </p>

        <div className="property-grid">
  {houses.slice(0, 3).map((house) => (
    <div
      className="property-card"
      key={house._id || house.id}
    >
      <img
        src={house.images?.[0] || house.image}
        alt={house.type}
      />

      <div className="property-details">
        <h3>{house.title}</h3>

        <p>
          <strong>Location:</strong> {house.location}
        </p>

        <p>
          <strong>Rent:</strong> KSh {house.rent}
        </p>

        <p>
          <strong>Status:</strong> {house.status}
        </p>

        <Link to={`/property/${house._id || house.id}`}>
          <button>View Details</button>
        </Link>
      </div>
    </div>
  ))}
</div>
      </section>

      {/* Popular Locations */}
      <section className="popular-locations">
        <h2>Popular Locations</h2>

        <p className="section-description">
          Explore rental houses in Kenya's most sought-after neighbourhoods.
        </p>

        <div className="locations-grid">
          <div className="location-card">
            <h3>🏘 Ruiru</h3>
            <p>Affordable houses close to Nairobi.</p>
          </div>

          <div className="location-card">
            <h3>🏢 Kiambu Town</h3>
            <p>Modern apartments and bedsitters.</p>
          </div>

          <div className="location-card">
            <h3>🌇 Westlands</h3>
            <p>Executive apartments in a prime location.</p>
          </div>

          <div className="location-card">
            <h3>🏠 Kasarani</h3>
            <p>Perfect for students and young professionals.</p>
          </div>

          <div className="location-card">
            <h3>🏡 Juja</h3>
            <p>Budget-friendly rental options.</p>
          </div>

          <div className="location-card">
            <h3>🏙 Kilimani</h3>
            <p>Luxury apartments with modern amenities.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us">
        <h2>Why Choose NyumbaConnect?</h2>

        <div className="why-grid">
          <div className="why-card">
            <h3>🏠 Verified Houses</h3>
            <p>Browse verified rental houses with genuine landlords.</p>
          </div>

          <div className="why-card">
            <h3>📍 Accurate Locations</h3>
            <p>Find houses using county, estate and sub-location.</p>
          </div>

          <div className="why-card">
            <h3>📞 Direct Contact</h3>
            <p>Contact landlords instantly by phone or WhatsApp.</p>
          </div>

          <div className="why-card">
            <h3>📅 Book Viewings</h3>
            <p>Schedule house viewing appointments online.</p>
          </div>

          <div className="why-card">
            <h3>❤️ Save Favorites</h3>
            <p>Save houses and compare them later.</p>
          </div>

          <div className="why-card">
            <h3>📊 Live Vacancy Status</h3>
            <p>View real-time availability before visiting.</p>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="call-to-action">
        <h2>Ready to Find Your Dream Home?</h2>

        <p>
          Join hundreds of tenants using NyumbaConnect to discover verified
          rental houses across Nairobi and Kiambu.
        </p>

        <div className="cta-buttons">
          <Link to="/search">
            <button className="cta-primary">🔍 Search Houses</button>
          </Link>

          <Link to="/register">
            <button className="cta-secondary">📝 Create Account</button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;