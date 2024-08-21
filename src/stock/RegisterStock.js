import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterStock.css";

const RegisterStock = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(""); // Changed from password_hash to password for clarity
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // To navigate after successful registration

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !password || !contact) {
      setMessage("Please fill in all fields");
      return; // Prevent further execution if validation fails
    }

    try {
      // Send a POST request to your backend
      const response = await fetch("http://localhost:5000/api/register-stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password, // Send password in the body
          contact,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setMessage("Registration successful");
      navigate("/stock");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div>
      <h1>Register Stock</h1>
      <form onSubmit={handleRegister}>
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
            type="password" // Changed to password for better security
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contact:</label>
          <input
            type="text" // Changed to text for better flexibility
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterStock;
