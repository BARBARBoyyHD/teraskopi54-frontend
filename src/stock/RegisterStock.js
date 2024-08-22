import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RegisterStock.module.css";
import { Link } from "react-router-dom";

const RegisterStock = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !password || !contact) {
      setMessage("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/register-stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
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
    <div className={styles.stock}>
      <header className={styles.navbar}>
        <div className={styles.navigation}>
          <Link to="/stock" className={styles["back-button"]}>
            
          </Link>
        </div>
      </header>
      <div className={styles["wrap-login-stock"]}>
        <h1>Register Stock</h1>
        <form onSubmit={handleRegister}>
          <div className={styles["wrap-input"]}>
            <label className={styles["label-stock"]}>
              Username
              <input
                className={styles["login-input-stock"]}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>

            <label className={styles["label-stock"]}>
              Password
              <input
                className={styles["login-input-stock"]}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <label className={styles["label-stock"]}>
              Contact
              <input
                className={styles["login-input-stock"]}
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </label>
          </div>
          <div className={styles["wrap-button-stock"]}>
            <button className = {styles["button-stock"]} type="submit">Submit</button>
          </div>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default RegisterStock;
