import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="page">

      <h1 style={{ fontSize: "80px" }}>404</h1>

      <h2>Page Not Found</h2>

      <p>
        Sorry, the page you are looking for does not exist.
      </p>

      <Link to="/">
        <button className="view-btn">
          ⬅ Back to Home
        </button>
      </Link>

    </section>
  );
}

export default NotFound;