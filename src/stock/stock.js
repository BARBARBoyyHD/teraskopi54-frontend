import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './stock.module.css';

const Stock = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Using useNavigate for redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login-stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Navigate on successful login
        navigate("/inventory");
      } else {
        // Parse JSON response to get error message
        const data = await response.json();
        setMessage(data.message || "Incorrect username or password");
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="stock">
      <h1>Stock Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <button>
          <Link to="/RegisterStock" style={{ textDecoration: 'none', color: 'inherit' }}>
            Register
          </Link>
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Stock;
