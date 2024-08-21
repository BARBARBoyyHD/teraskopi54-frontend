import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Cashier = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/login-cashier", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => {
        res.json();
        if (res.ok) {
          navigate("/CashierMenu");
        } else {
          alert("Incorrect username or password");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred during login");
      });
  };

  return (
    <div className="cashier">
      <h1>Login Cashier</h1>
      <form onSubmit={handleLogin} className="login-form">
        <label htmlFor="username" className="usn">
          User Name:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-cashier"
          required
        />
        <label htmlFor="password" className="password">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-cashier"
          required
        />
        <button type="submit" className="login-button">
          Login
        </button>
        <Link to="/RegisterCashier">
          <button type="button">Register</button>
        </Link>
      </form>
    </div>
  );
};

export default Cashier;
