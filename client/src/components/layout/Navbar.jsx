import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.fullName || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("user");

    toast.success("Logged out successfully 👋");

    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo-section">
        <div className="logo">🏠</div>

        <div className="logo-text">
          <h2>NyumbaConnect</h2>
          <p>AN INTEGRATED HOUSE HUNTING WEBSITE</p>
        </div>
      </div>

      {isLoggedIn && (
        <div className="user-role">
          Welcome, {userName}
        </div>
      )}

      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      <ul className={menuOpen ? "nav-links menu-open" : "nav-links"}>

        <li>
          <NavLink
            to="/"
            end
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/properties"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Properties
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/favorites"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Favorites
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/search"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Search Houses
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/vacancy-status"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Vacancy Status
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/about"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            About
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/contact"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Contact
          </NavLink>
        </li>

        {!isLoggedIn ? (
          <>
            <li>
              <NavLink
                to="/login"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
              >
                Login
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/register"
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
              >
                Register
              </NavLink>
            </li>
          </>
        ) : (
          <li>
            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        )}

      </ul>
    </nav>
  );
}

export default Navbar;