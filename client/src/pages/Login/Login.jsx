import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

  const demoUsers = [
  {
    email: "tenant@nyumbaconnect.com",
    password: "tenant123",
    role: "Tenant",
  },
  {
    email: "landlord@nyumbaconnect.com",
    password: "landlord123",
    role: "Landlord",
  },
  {
    email: "caretaker@nyumbaconnect.com",
    password: "caretaker123",
    role: "Caretaker",
  },
  {
    email: "admin@nyumbaconnect.com",
    password: "admin123",
    role: "Admin",
  },
];

  const handleLogin = (e) => {
  e.preventDefault();

  const account = demoUsers.find(
    (demo) =>
      demo.email === user.email &&
      demo.password === user.password &&
      demo.role === user.role
  );

  if (!account) {
    toast.error("Invalid email, password or role.");
    return;
  }

  localStorage.setItem("userRole", account.role);
localStorage.setItem("isLoggedIn", "true");

  switch (account.role) {
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

        <div className="demo-users">
  <h3>Demo Accounts</h3>

  <p><strong>Tenant:</strong> tenant@nyumbaconnect.com / tenant123</p>

  <p><strong>Landlord:</strong> landlord@nyumbaconnect.com / landlord123</p>

  <p><strong>Caretaker:</strong> caretaker@nyumbaconnect.com / caretaker123</p>

  <p><strong>Admin:</strong> admin@nyumbaconnect.com / admin123</p>
</div>

      </div>

    </section>
  );
}

export default Login;