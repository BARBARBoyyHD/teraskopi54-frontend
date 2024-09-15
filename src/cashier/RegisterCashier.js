import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import style from "./RegisterCashier.module.css";

const RegisterCashier = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    fetch("https://api.myteraskopi54.my.id/api/register-cashier", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password, contact }),
    })
      .then((res) => {
        if (res.ok) {
          alert("Register Success");
          navigate("/cashier");
        } else {
          alert("Register Failed");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={style["stock"]}>
      <header className={style["navbar"]}>
        <div className={style["navigation"]}>
          <Link to="/cashier" className={style["back-button"]}></Link>
        </div>
      </header>
      <div className={style["wrap-login-stock"]}>
        <h1>Cashier Login</h1>
        <form onSubmit={handleRegister}>
          <div className={style["wrap-input"]}>
            <label className={style["label-stock"]}>
              Username
              <input
                className={style["login-input-stock"]}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>

            <label className={style["label-stock"]}>
              Password
              <input
                className={style["login-input-stock"]}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <label className={style["label-stock"]}>
              Contact
              <input
                className={style["login-input-stock"]}
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </label>
          </div>
          <div className={style["wrap-button-stock"]}>
            <button type="submit" className={style["btn-login"]}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterCashier;
