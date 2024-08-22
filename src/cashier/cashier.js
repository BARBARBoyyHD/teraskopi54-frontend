import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import style from "./cashier.module.css";


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

  const handleRegister = (e) => {
    navigate("/RegisterCashier");
  }

  return (
    <div className={style["stock"]}>
    <header className={style["navbar"]}>
      <div className={style["navigation"]}>
        <Link to="/" className={style["back-button"]}></Link>
      </div>
    </header>
    <div className={style["wrap-login-stock"]}>
      <h1>Cashier Login</h1>
      <form onSubmit={handleLogin}>
        <div className={style["wrap-input"]}>
        <div className={style["wrap-input"]}>
            <div className={style["icon-input"]}>
              <i className="fas fa-user"></i>
              <input
                className={style["login-input-stock"]}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Username"
              />
            </div>

            <div className={style["icon-input"]}>
              <i className="fas fa-lock"></i>
              <input
                className={style["login-input-stock"]}
                type="text"
                value={username}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
          </div>
        </div>
        <div className={style["wrap-button-stock"]}>
          <button type="submit" className={style["btn-login"]}>Login</button>

          <button onClick={handleRegister}  className={style["btn-register"]}>Register</button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default Cashier;
