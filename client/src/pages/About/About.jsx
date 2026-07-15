function About() {
  return (
    <section className="page">

      <h1>About NyumbaConnect</h1>

      <p
  style={{
    textAlign: "center",
    maxWidth: "900px",
    margin: "0 auto 40px",
    fontSize: "18px",
  }}
>
  NyumbaConnect is an Integrated House Hunting Website
  designed to simplify the process of searching,
  advertising and managing rental houses across
  Nairobi and Kiambu Counties.
</p>

      <h2>Our Mission</h2>

      <p>
        To provide a reliable, secure, and user-friendly platform that connects
        tenants, landlords, caretakers, and administrators in one integrated
        housing management system.
      </p>

      <h2>Our Vision</h2>

      <p>
        To become Kenya's most trusted digital platform for rental property
        discovery and management.
      </p>

      <h2>Objectives</h2>

      <ul>
        <li>Help tenants find houses quickly.</li>
        <li>Allow landlords to advertise vacant properties.</li>
        <li>Enable caretakers to update vacancy status.</li>
        <li>Allow online viewing requests.</li>
        <li>Improve communication between all users.</li>
      </ul>

      <h2>System Users</h2>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h3>👤 Tenant</h3>
          <p>
            Searches houses, saves favorites, and requests property viewings.
          </p>
        </div>

        <div className="dashboard-card">
          <h3>🏠 Landlord</h3>
          <p>
            Adds properties, manages listings, and responds to viewing requests.
          </p>
        </div>

        <div className="dashboard-card">
          <h3>🔑 Caretaker</h3>
          <p>
            Updates vacancy status and assists with property management.
          </p>
        </div>

        <div className="dashboard-card">
          <h3>⚙️ Administrator</h3>
          <p>
            Oversees the entire system, users, reports, and property records.
          </p>
        </div>

      </div>

      <h2>Technologies Used</h2>

      <ul>
        <li>React.js</li>
        <li>React Router</li>
        <li>JavaScript (ES6)</li>
        <li>CSS3</li>
        <li>HTML5</li>
      </ul>

    </section>
  );
}

export default About;