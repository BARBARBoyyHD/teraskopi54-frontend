import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./stock.module.css"; // Ensure correct import path

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
        navigate("/inventory");
      } else {
        const data = await response.json();
        setMessage(data.message || "Incorrect username or password");
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleRegister = () => {
    navigate("/RegisterStock");
  };

  return (
    <div className={styles.stock}>
      <header className={styles.navbar}>
        <div className={styles.navigation}>
          <Link to="/" className={styles["back-button"]}></Link>
        </div>
      </header>
      <div className={styles["wrap-login-stock"]}>
        <h1>Stock Login</h1>
        <form onSubmit={handleLogin}>
          <div className={styles["wrap-input"]}>
            <div className={styles["icon-input"]}>
              <i className="fas fa-user"></i>
              <input
                className={styles["login-input-stock"]}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Username"
              />
            </div>

            <div className={styles["icon-input"]}>
              <i className="fas fa-lock"></i>
              <input
                className={styles["login-input-stock"]}
                type="text"
                value={username}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
          </div>
          <div className={styles["wrap-button-stock"]}>
            <button type="submit" className={styles["btn-login"]}>
              Login
            </button>
            <button
              type="button"
              className={styles["btn-register"]}
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Stock;
