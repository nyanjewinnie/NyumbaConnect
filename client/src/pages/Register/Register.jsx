import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    county: "",
    role: "Tenant",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
  !user.fullName ||
  !user.email ||
  !user.phone ||
  !user.county ||
  !user.password
) {
  toast.error("Please fill in all required fields.");
  return;
}

    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match ❌");
      return;
    }

    try {
      await axios.post(
  `${import.meta.env.VITE_API_URL}/users/register`,
        {
          fullName: user.fullName,
          email: user.email,
          phone: user.phone,
          password: user.password,
          role: user.role,
        }
      );

      toast.success("Registration successful 🎉");

      setUser({
        fullName: "",
        email: "",
        phone: "",
        county: "",
        role: "Tenant",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Registration failed."
      );
    }
  };

  return (
    <section className="register-page">

      <div className="register-card">

        <h1>Create Account</h1>

        <p>Join NyumbaConnect today.</p>

        <form onSubmit={handleRegister}>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={user.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={user.email}
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={user.phone}
            onChange={handleChange}
            required
          />

          <select
            name="county"
            value={user.county}
            onChange={handleChange}
            required
          >
            <option value="">Select County</option>
            <option>Nairobi</option>
            <option>Kiambu</option>
          </select>

          <select
            name="role"
            value={user.role}
            onChange={handleChange}
          >
            <option>Tenant</option>
            <option>Landlord</option>
            <option>Caretaker</option>
          </select>

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={user.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Register
          </button>

        </form>

      </div>

    </section>
  );
}

export default Register;