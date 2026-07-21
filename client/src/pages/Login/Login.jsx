import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "Tenant",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/login`,
      {
        email: user.email,
        password: user.password,
      }
    );

    const loggedInUser = response.data.user;

    // Check selected role
    if (loggedInUser.role !== user.role) {
      toast.error("Selected role does not match this account.");
      return;
    }

    // Save login details
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", loggedInUser.role);
    localStorage.setItem("user", JSON.stringify(loggedInUser));

    toast.success("Login successful 🎉");

    switch (loggedInUser.role) {
      case "Tenant":
        navigate("/tenant");
        break;

      case "Landlord":
        navigate("/landlord");
        break;

      case "Caretaker":
        navigate("/caretaker");
        break;

      case "Admin":
        navigate("/admin");
        break;

      default:
        navigate("/");
    }

  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Invalid email or password."
    );
  }
};

  return (
    <section className="login-page">

      <div className="login-card">

        <h1>Login</h1>

        <p>Access your NyumbaConnect account.</p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={user.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            value={user.role}
            onChange={handleChange}
          >
            <option>Tenant</option>
            <option>Landlord</option>
            <option>Caretaker</option>
            <option>Admin</option>
          </select>

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </section>
  );
}

export default Login;